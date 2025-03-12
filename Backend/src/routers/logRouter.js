const express = require("express");
const logController = require("../controller/logController");

const router = express.Router();

router.route("/").post(logController.addLogs);

module.exports = router;
