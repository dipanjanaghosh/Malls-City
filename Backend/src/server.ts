import express from "express";
import cors from "cors";
import { MYDATA } from "./data";

const app = express();

app.use(cors({
    credentials:true,
    origin:["http://localhost:4200"]
}));

const port = 5000;
app.listen(port, ()=>{
    console.log("Website is running at http://localhost:" + port);
})

app.get("/api/cities", (req,res) => {
    res.send(MYDATA.cities);
})

app.get("/api/malls", (req,res) => {
    res.send(MYDATA.malls);
})

app.get("/api/shops", (req,res) => {
    res.send(MYDATA.shops);
})

app.post("/api/users/login", (req,res) => {
    console.log("req",req.body);
})

const generateTokenResponse = (user:any) => {
    
}

// http://localhost:5000/api/cities