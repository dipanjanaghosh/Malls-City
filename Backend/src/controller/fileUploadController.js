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
