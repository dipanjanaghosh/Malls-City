const express = require("express");
const mallController = require("../controller/mallController");
const { upload } = require("../controller/fileUploadController");

const router = express.Router();

router
    .route("/")
    .get(mallController.getAllMall)
    .post(upload.single("mallImg"), mallController.addMall);

// router.route("/:cityCode").get(cityController.getOneCity);

module.exports = router;
