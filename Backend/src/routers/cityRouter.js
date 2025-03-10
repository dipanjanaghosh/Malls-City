const express = require("express");
const cityController = require("../controller/cityController");

const router = express.Router();

router
    .route("/")
    .get(cityController.getAllCity)
    .post(cityController.checkBodyMiddleWare, cityController.addCity);

router.route("/:cityCode").get(cityController.getOneCity);

module.exports = router;
