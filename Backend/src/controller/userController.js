const { userModel } = require("../models/userModel");
const jwt = require("jsonwebtoken");

exports.addUser = async (req, res) => {
    console.log("body received", req.body);
    try {
        const user = await userModel.create(req.body);
        console.log("/admin/addUser :", user);
        res.status(201).json({ message: "User created successfully" });
    } catch (err) {
        if (err.code === 11000) {
            console.log("/admin/addUser :", err);
            res.status(500).send({
                status: "fail",
                error: "Error Adding User.Duplicate Key",
                keyName: err?.keyValue,
            });
        } else {
            console.log("/admin/addUser :", err);
            res.status(500).send({
                status: "fail",
                error: "Error Adding User",
                errMsg: err?.errorResponse?.errMsg,
            });
        }
    }
};

exports.getUser = async (req, res) => {
    const userArr = await userModel.find();
    console.log("user arr : *****", userArr);
    res.send({
        statusMsg: "Success",
        list: userArr,
        count: userArr.length,
    });
};

exports.loginUser = async (req, res) => {
    try {
        console.log("login user : *****", req.body);
        // const user = await UserModel.find({ email: req.body.email });
        const user = await userModel.findOne({ email: req.body.email });
        console.log("user : *****", user);
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const isPasswordValid = await user.comparePassword(req.body.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Generate JWT
        const token = jwt.sign(
            { userId: user._id, email: user.email }, // Payload
            process.env.JWT_SECRET, // Secret key (store in .env)
            { expiresIn: "1h" } // Token expiration
        );

        res.json({ token, userId: user._id, username: user.username });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Login failed", error: error.message });
    }
};
