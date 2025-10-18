import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import readline from "readline";
import dotenv from "dotenv";
import { fileURLToPath } from "url";

// ESM-safe __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, "../../src/.env") });

// MongoDB connection string
const MONGO_URI = process.env.MONGO_URI || "your_mongo_connection_string_here";

const BACKUP_DIR = path.resolve(__dirname, "../../backups");

// ------------------------------
// 🔹 Ask for confirmation
// ------------------------------
function askConfirmation(question: string): Promise<boolean> {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    return new Promise((resolve) => {
        rl.question(`${question} (Y/N): `, (answer) => {
            rl.close();
            resolve(answer.trim().toLowerCase() === "y");
        });
    });
}

// ------------------------------
// 🔹 Get the latest backup file
// ------------------------------
function getLatestBackupFile(): string {
    if (!fs.existsSync(BACKUP_DIR)) {
        throw new Error(`❌ Backup directory not found: ${BACKUP_DIR}`);
    }

    const files = fs
        .readdirSync(BACKUP_DIR)
        .filter((f) => f.startsWith("indexes_backup_") && f.endsWith(".json"))
        .sort(
            (a, b) =>
                fs.statSync(path.join(BACKUP_DIR, b)).mtimeMs -
                fs.statSync(path.join(BACKUP_DIR, a)).mtimeMs
        );

    if (files.length === 0) {
        throw new Error("❌ No backup files found in the backups/ directory!");
    }

    return path.join(BACKUP_DIR, files[0]);
}

// ------------------------------
// 🔹 Restore indexes
// ------------------------------
async function restoreIndexes() {
    try {
        console.log("🔗 Connecting to MongoDB Atlas...");
        await mongoose.connect(MONGO_URI);
        console.log("✅ Connected successfully\n");

        const latestBackupFile = getLatestBackupFile();
        console.log(`🧾 Latest backup file detected: ${latestBackupFile}`);

        const confirmed = await askConfirmation(
            "⚠️ Are you sure you want to restore indexes from this backup?"
        );

        if (!confirmed) {
            console.log("❌ Operation canceled by user. No changes made.");
            await mongoose.disconnect();
            process.exit(0);
        }

        const backupData: Record<string, any> = JSON.parse(
            fs.readFileSync(latestBackupFile, "utf-8")
        );

        const modelNames = Object.keys(backupData);
        console.log(
            `\n📦 Found ${modelNames.length} models to restore:`,
            modelNames.join(", ")
        );

        for (const modelName of modelNames) {
            let Model;
            try {
                // If model is already registered in Mongoose
                if (mongoose.modelNames().includes(modelName)) {
                    Model = mongoose.model(modelName);
                } else {
                    // If not, create placeholder schema
                    Model = mongoose.model(
                        modelName,
                        new mongoose.Schema({}, { strict: false })
                    );
                }
            } catch {
                Model = mongoose.model(
                    modelName,
                    new mongoose.Schema({}, { strict: false })
                );
            }

            const indexes = backupData[modelName];
            console.log(`\n🔁 Restoring indexes for: ${modelName}`);

            for (const index of indexes) {
                if (index.name === "_id_") continue; // skip default _id

                try {
                    await Model.collection.createIndex(index.key, {
                        name: index.name,
                        unique: index.unique,
                        sparse: index.sparse,
                        background: true,
                    });
                    console.log(`   ✅ Restored index: ${index.name}`);
                } catch (err: any) {
                    if (err.codeName === "IndexOptionsConflict") {
                        console.log(
                            `   ⚠️ Index ${index.name} already exists with different options, skipping.`
                        );
                    } else {
                        console.error(
                            `   ❌ Failed to restore ${index.name}:`,
                            err.message
                        );
                    }
                }
            }
        }

        console.log("\n🎉 All indexes restored successfully!");
    } catch (error: any) {
        console.error("\n❌ Error during restoration:", error.message);
    } finally {
        await mongoose.disconnect();
        console.log("🔌 Disconnected from MongoDB");
    }
}

// Run the restore script
restoreIndexes();
