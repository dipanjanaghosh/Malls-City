const logger = require("../appLogger");

exports.addLogs = async (req, res) => {
    const { level, message, timestamp } = req.body;
    logger.log(level, `[Frontend] ${message}`, { timestamp });
    res.status(200).send({ message: "Log added successfully" });
};
