import dotenv from "dotenv";
dotenv.config()
import express from "express";

import cors from "cors";
import { MYDATA } from "./data";
import  sharedRouter from "./routers/shared.router";
import  adminRouter from "./routers/admin.router";
import { dbConnect } from './configs/database.config';
dbConnect();

const app = express();

app.use(cors({
    credentials:true,
    origin:["http://localhost:4200"]
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/shared", sharedRouter);
app.use("/api/admin", adminRouter);

https://www.youtube.com/watch?v=WqJ0P8JnftI

const port = 5000;
app.listen(port, ()=>{
    console.log("Website is running at http://localhost:" + port);
})

app.post("/api/users/login", (req,res) => {
    console.log("req",req.body);
})