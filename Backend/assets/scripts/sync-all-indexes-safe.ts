import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

// ----------------------------
// ✅ CommonJS __dirname works in TS
// ----------------------------
const __dirnameSafe = path.resolve(); // project root
dotenv.config({ path: path.join(__dirnameSafe, "src/.env") });

// ----------------------------
// MongoDB URI with fallback
// ----------------------------
const MONGO_URI: string =
    process.env.MONGO_URI || "your_mongo_connection_string_here";

// ----------------------------
// Models folder
// ----------------------------
const MODELS_PATH = path.join(__dirnameSafe, "src/models");

// ----------------------------
// Load all models dynamically
// ----------------------------
async function loadAllModels() {
    const modelFiles = fs
        .readdirSync(MODELS_PATH)
        .filter((f) => f.endsWith(".ts") || f.endsWith(".js"));
    for (const file of modelFiles) {
        require(path.join(MODELS_PATH, file));
    }
}

// ----------------------------
// Backup indexes
// ----------------------------
async function backupIndexes() {
    const backupDir = path.join(__dirnameSafe, "backups");
    if (!fs.existsSync(backupDir)) fs.mkdirSync(backupDir, { recursive: true });

    const backupFile = path.join(
        backupDir,
        `indexes_backup_${new Date().toISOString().replace(/[:.]/g, "-")}.json`
    );

    const backupData: Record<string, any> = {};
    const modelNames = mongoose.modelNames();

    for (const modelName of modelNames) {
        const Model = mongoose.model(modelName);
        const indexes = await Model.collection.indexes();
        backupData[modelName] = indexes;
    }

    fs.writeFileSync(backupFile, JSON.stringify(backupData, null, 2));
    console.log(`🧾 Backup saved: ${backupFile}`);
}

// ----------------------------
// Sync all indexes
// ----------------------------
async function syncAllIndexes() {
    try {
        console.log("🔗 Connecting to MongoDB Atlas...");
        await mongoose.connect(MONGO_URI);
        console.log("✅ Connected successfully\n");

        await loadAllModels();

        const modelNames = mongoose.modelNames();
        console.log(
            `📚 Found ${modelNames.length} models:`,
            modelNames.join(", ")
        );

        await backupIndexes();

        for (const modelName of modelNames) {
            const Model = mongoose.model(modelName);
            console.log(`\n🔍 Syncing indexes for: ${modelName}`);
            const result = (await Model.syncIndexes()) as any;
            console.log("✅ Sync completed for:", modelName);
            console.log("   → Created:", result.createdIndexes || []);
            console.log("   → Removed:", result.removedIndexes || []);
        }

        console.log("\n🎉 All model indexes synced successfully!");
    } catch (error) {
        console.error("❌ Error syncing indexes:", error);
    } finally {
        await mongoose.disconnect();
        console.log("🔌 Disconnected from MongoDB");
    }
}

// Run the sync script
syncAllIndexes();
