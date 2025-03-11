const express = require("express");
const cityController = require("../controller/cityController");
const verifyToken = require("../middlewares/verifyTokenMiddleware");
const checkBodyMiddleWare = require("../middlewares/checkBodyMiddleware");

const router = express.Router();

router
    .route("/")
    .get(cityController.getAllCity)
    .post(
        [checkBodyMiddleWare.checkBodyMiddleWare, verifyToken.verifyToken],
        cityController.addCity
    );

router.route("/:cityCode").get(cityController.getOneCity);

module.exports = router;
