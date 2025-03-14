const { userModel } = require("../models/userModel");
const logger = require("../appLogger");
const jwt = require("jsonwebtoken");

exports.addUser = async (req, res) => {
    logger.info(
        `userController::addUser:: body received : *****${JSON.stringify(
            req.body
        )}`
    );
    try {
        const user = await userModel.create(req.body);
        logger.info(
            `userController:: user added : *****${JSON.stringify(user)}`
        );
        res.status(201).json({ message: "User created successfully" });
    } catch (err) {
        if (err.code === 11000) {
            logger.error(`addUser:error If Block :${JSON.stringify(err)}`);
            res.status(500).send({
                status: "fail",
                error: "Error Adding User.Duplicate Key",
                keyName: err?.keyValue,
            });
        } else {
            logger.error(`addUser:error else Block :${JSON.stringify(err)}`);
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
    logger.info(
        `userController::getUser::userArr : *****${JSON.stringify(userArr)}`
    );
    res.send({
        statusMsg: "Success",
        list: userArr,
        count: userArr.length,
    });
};

exports.loginUser = async (req, res) => {
    try {
        logger.info(
            `userController::loginUser:: req.body : *****${JSON.stringify(
                req.body
            )}`
        );
        // const user = await UserModel.find({ email: req.body.email });
        const user = await userModel.findOne({ email: req.body.email });
        logger.info(
            `userController::loginUser:: user : *****${JSON.stringify(user)}`
        );
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

        let resObject = { token, userId: user._id, username: user.username };
        logger.info(
            `userController::loginUser:: resObject : *****${JSON.stringify(
                resObject
            )}`
        );

        res.json(resObject);
    } catch (error) {
        logger.error(
            `userController::loginUser:: Login error: : *****${JSON.stringify(
                error
            )}`
        );
        res.status(500).json({ message: "Login failed", error: error.message });
    }
};
