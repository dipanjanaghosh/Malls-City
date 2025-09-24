import { Router } from "express";
const userController = require("../controller/userController");
const router = Router();

router.route("/").get(userController.getUser).post(userController.addUser);

router.route("/login").post(userController.loginUser);

export default router;
