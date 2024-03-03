import express from "express";
import cors from "cors";
import { store } from "./data";

const app = express();

app.use(cors({
    credentials:true,
    origin:["http://localhost:4200"]
}));

const port = 5000;
app.listen(port, ()=>{
    console.log("Website is running at http://localhost:" + port);
})

app.get("/api/stores", (req,res) => {
    res.send(store);
})