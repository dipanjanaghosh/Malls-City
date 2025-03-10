const { UserModel } = require("../models/userModel");

exports.addUser = async (req, res) => {
    console.log("body received", req.body);
    try {
        const user = await UserModel.create(req.body);
        console.log("/admin/addUser :", user);
        res.send(req.body);
    } catch (err) {
        if (err.code === 11000) {
            res.status(500).send({
                status: "fail",
                error: "Error Adding User.Duplicate Key",
                keyName: err?.keyValue,
            });
        } else {
            res.status(500).send({
                status: "fail",
                error: "Error Adding User",
                errMsg: err?.errorResponse?.errMsg,
            });
        }
    }
};

exports.checkBodyMiddleWare = (req, res, next) => {
    if (!req.body.name || !req.body.email || !req.body.password) {
        return res.status(400).send({
            statsu: "fail",
            error: "Name or Email or Password is missing",
        });
    }
    next();
};

exports.getUser = async (req, res) => {
    const userArr = await UserModel.find();
    console.log("user arr : *****", userArr);
    res.send({
        statusMsg: "Success",
        list: userArr,
        count: userArr.length,
    });
};

exports.loginUser = async (req, res) => {
    const user = await UserModel.find({ email: req.body.email });
    console.log("user : *****", user);
    if (
        user[0].password === req.body.password &&
        user[0].email === req.body.email
    ) {
        res.send({
            statusValue: "Success",
            statusMsg: "User logged in successfully",
        });
    } else {
        res.send({
            statusValue: "fail",
            statusMsg: "Email or Password does not match",
        });
    }
};
