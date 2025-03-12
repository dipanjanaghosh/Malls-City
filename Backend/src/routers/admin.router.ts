import { Router } from "express";
const userController = require("../controller/userController");
const router = Router();

router.route("/").get(userController.getUser).post(userController.addUser);

router.route("/login").post(userController.loginUser);

//wildcard routes get called when no routes are matched
router.get("*", (req, res) => {
    res.send("get URL not found");
});

router.post("*", (req, res) => {
    res.send("post URL not found");
});
export default router;
