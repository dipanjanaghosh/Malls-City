const multer = require("multer");
const logger = require("../appLogger");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.fieldname === "mallImg") {
            cb(null, "./uploads/mall");
            logger.info(
                `fileUploadController:://storage::mallImg file--------:: ${JSON.stringify(
                    file
                )}`
            );
        } else if (file.fieldname === "shopImg") {
            logger.info(
                `fileUploadController:://storage::shopImg file--------:: ${JSON.stringify(
                    file
                )}`
            );
            cb(null, "./uploads/shop");
        }
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

exports.upload = multer({ storage });
