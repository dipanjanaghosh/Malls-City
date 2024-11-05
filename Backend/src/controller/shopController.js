const { ShopModel } = require("../models/shop.model");

exports.getAllShop = async (req, res) => {
    const shop = await ShopModel.find();
    res.send(shop);
};

exports.addShop = async (req, res) => {
    req.body["shopImg"] = req?.file?.path;
    let resObj = {
        msg: "Shop Added",
        name: req.body.name,
    };
    const savedShop = await ShopModel.create(req.body);
    console.log("/post/shop::savedshop:", savedShop);
    res.send(resObj);
};
