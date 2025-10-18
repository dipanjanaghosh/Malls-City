import dotenv from "dotenv";
// dotenv.config();

import express from "express";
import cors from "cors";
import morgan from "morgan";
import path from "path";
import { dbConnect } from "./configs/database.config";
import logger from "./appLogger";

import sharedRouter from "./routers/shared.router";
import adminRouter from "./routers/admin.router";
import cityRouter from "./routers/cityRouter";
import mallRouter from "./routers/mallRouter";
import shopRouter from "./routers/shopRouter";
import logRouter from "./routers/logRouter";

// Load environment variables from .env file inside dist folder after build as it was not working with just dotenv.config()
dotenv.config({ path: path.resolve(__dirname, "../src/.env") });
// Connect to MongoDB database
dbConnect();

const app = express();
app.use(
    cors({
        credentials: true,
        origin: [process.env.FRONTEND_URL!],
    })
);
app.use(
    morgan("combined", {
        stream: { write: (message) => logger.info(message.trim()) },
    })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Serve static files from the Angular build output directory
app.use(express.static(path.join(__dirname, "..", "public")));

app.use("/api/v1/mall", mallRouter);
app.use("/api/v1/shop", shopRouter);
app.use("/api/v1/city", cityRouter);
app.use("/api/v1/shared", sharedRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/logs", logRouter);

// Wildcard route to serve the Angular app for any non-API routes.
// This must be placed after all other API routes.
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
});
