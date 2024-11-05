import { Router } from "express";

const mallController = require("../controller/mallController");
const shopController = require("../controller/shopController");
const router = Router();

router.get("/malls", mallController.getAllMall);

router.get("/shops", shopController.getAllShop);

export default router;
