import { Router } from "express";
const shopController = require("../controller/shopController");
const { upload } = require("../controller/fileUploadController");
const router = Router();

router.post("/addshop", upload.single("shopImg"), shopController.addShop);

//wildcard routes get called when no routes are matched
router.get("*", (req, res) => {
    res.send("get URL not found");
});

router.post("*", (req, res) => {
    res.send("post URL not found");
});
export default router;
