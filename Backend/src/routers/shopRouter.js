const express = require("express");
const shopController = require("../controller/shopController");
const { upload } = require("../controller/fileUploadController");

const router = express.Router();

router
    .route("/")
    .get(shopController.getAllShop)
    .post(upload.single("shopImg"), shopController.addShop);

// router.route("/:cityCode").get(cityController.getOneCity);

module.exports = router;
