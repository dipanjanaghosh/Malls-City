import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import { MYDATA } from "./data";
import sharedRouter from "./routers/shared.router";
import adminRouter from "./routers/admin.router";
import { dbConnect } from "./configs/database.config";
import morgan from "morgan"; //HTTP request logger middleware for node.js
const logger = require("./appLogger");
const cityRouter = require("./routers/cityRouter");
const mallRouter = require("./routers/mallRouter");
const ShopRouter = require("./routers/shopRouter");

// Connect to MongoDB database
dbConnect();

const app = express();

app.use(
    cors({
        credentials: true,
        origin: ["http://localhost:4200"],
    })
);
app.use(
    morgan("combined", {
        stream: { write: (message) => logger.info(message.trim()) },
    })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use((req, res, next) => {
//     console.log("From Custom Middleware :", req.url);
//     next();
// });
app.use("/api/v1/mall", mallRouter);
app.use("/api/v1/shop", ShopRouter);
app.use("/api/v1/city", cityRouter);
app.use("/api/v1/shared", sharedRouter);
app.use("/api/v1/admin", adminRouter);

//www.youtube.com/watch?v=WqJ0P8JnftI

const port = 5000;
app.listen(port, () => {
    console.log("Website is running at http://localhost:" + port);
    if (process.env.NODE_ENV === "production") {
        console.log("production");
    }
});

app.post("/api/users/login", (req, res) => {
    console.log("req", req.body);
});

app.delete("/api/test", (req, res) => {
    console.log("delete req", req.body);
});
