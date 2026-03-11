const { Router } = require("express");
const authController = require("../controller/auth.controller");
const { authenticateToken } = require("../middlewares/auth.middleware");
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

/**
 *
 * @description Clear Cookies and Blacklist Token
 * @route GET /api/auth/logout
 * @access Public
 *
 */
authRouter.get("/logout", authController.logoutUserController);

/**
 *
 * @description Get User Details
 * @route GET /api/auth/me
 * @access Private
 *
 */
authRouter.get(
  "/me",
  authenticateToken,
  authController.getUserDetailsController,
);

module.exports = authRouter;
