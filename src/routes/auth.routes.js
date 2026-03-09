const { Router } = require("express");
const authController = require("../controller/auth.controller");
const authRouter = Router();

/**
 *
 * @description Register a new user expects username, email, and password
 * @route POST /api/auth/register
 * @access Public
 *
 */
authRouter.post("/register", authController.registerUserController);

/**
 *
 * @description Login a user expects email and password
 * @route POST /api/auth/login
 * @access Public
 *
 */
authRouter.post("/login", authController.loginUserController);

module.exports = authRouter;
