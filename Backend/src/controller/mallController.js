const { MallModel } = require("../models/mall.model");
const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.fieldname === "mallImg") {
            cb(null, "./uploads/mall");
            console.log("mallImg file--------");
        } else if (file.fieldname === "shopImg") {
            console.log("shopImg file--------");
            cb(null, "./uploads/shop");
        }
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

exports.upload = multer({ storage });

exports.getAllMall = async (req, res) => {
    const mall = await MallModel.find();
    res.send(mall);
};

exports.addMall = async (req, res) => {
    req.body["mallImg"] = req?.file?.path;
    let resObj = {
        msg: "Mall Added",
        name: req.body.name,
    };
    const savedMall = await MallModel.create(req.body);
    console.log("admin.router::/addmall::savedMall:", savedMall);
    res.send(resObj);
};
