const { ShopModel } = require("../models/shop.model");
const logger = require("../appLogger");

exports.getAllShop = async (req, res) => {
    const shop = await ShopModel.find();
    logger.info(`shopController::getAllShop :shop length = ${shop.length}`);
    res.send(shop);
};

exports.addShop = async (req, res) => {
    req.body["shopImg"] = req?.file?.path;
    let resObj = {
        msg: "Shop Added",
        name: req.body.name,
    };
    const savedShop = await ShopModel.create(req.body);
    logger.info(
        `shopController:addShop::-------------resObj--------:: ${JSON.stringify(
            resObj
        )}-----savedShop :----${JSON.stringify(savedShop)}`
    );
    res.send(resObj);
};
