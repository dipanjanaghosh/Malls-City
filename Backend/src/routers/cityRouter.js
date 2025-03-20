const express = require("express");
const cityController = require("../controller/cityController");
const verifyToken = require("../middlewares/verifyTokenMiddleware");
const checkCityBodyMiddleWare = require("../middlewares/checkCityBodyMiddleware");

const router = express.Router();

router
    .route("/")
    .get(cityController.getAllCity)
    .post(
        [
            checkCityBodyMiddleWare.checkCityBodyMiddleWare,
            verifyToken.verifyToken,
        ],
        cityController.addCity
    );

router.route("/:cityCode").get(cityController.getOneCity);

module.exports = router;
