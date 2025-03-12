const { MallModel } = require("../models/mall.model");
const logger = require("../appLogger");

exports.getAllMall = async (req, res) => {
    const mall = await MallModel.find();
    logger.info(`mallController::getALlMall :mall length = ${mall.length}`);
    res.send(mall);
};

exports.addMall = async (req, res) => {
    req.body["mallImg"] = req?.file?.path;
    let resObj = {
        msg: "Mall Added",
        name: req.body.name,
    };
    const savedMall = await MallModel.create(req.body);
    logger.info(
        `mallController:addmall::-------------resObj--------:: ${JSON.stringify(
            resObj
        )}-----savedMall :----${JSON.stringify(savedMall)}`
    );
    res.send(resObj);
};
