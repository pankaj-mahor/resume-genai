const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
/**
 *
 * @route POST /api/auth/register
 * @description Register a new user expects username, email, and password
 * @access Public
 * @returns {Object} 201 - User created successfully
 * @returns {Object} 400 - Bad request
 * @returns {Object} 500 - Internal server error
 */
const registerUserController = async (req, res) => {
  console.log("Registering user", req.body);
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res
      .status(400)
      .json({ message: "All fields are required", success: false });
  }

  const isUserAlreadyExists = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  if (isUserAlreadyExists) {
    return res
      .status(400)
      .json({ message: "User already exists", success: false });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await userModel.create({
    username,
    email,
    password: hashedPassword,
  });

  const token = jwt.sign(
    { id: newUser._id, username: newUser.username },
    process.env.JWT_SECRET,
    { expiresIn: "1h" },
  );

  res.cookie("token", token, { httpOnly: true, secure: true, maxAge: 3600000 });

  if (newUser) {
    return res.status(201).json({
      message: "User created successfully",
      user: {
        username: newUser.username,
        email: newUser.email,
        userId: newUser._id,
      },
      success: true,
    });
  }

  return res
    .status(500)
    .json({ message: "Internal server error", success: false });
};

/**
 *
 * @name loginUserController
 * @route POST /api/auth/login
 * @description Login a user expects email and password
 * @access Public
 */
const loginUserController = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "All fields are required", success: false });
  }

  const user = await userModel.findOne({
    email,
  });

  if (!user) {
    return res.status(400).json({ message: "User not found", success: false });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res
      .status(400)
      .json({ message: "Invalid credentials", success: false });
  }

  const token = jwt.sign(
    { id: user._id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: "1h" },
  );

  res.cookie("token", token, { httpOnly: true, secure: true, maxAge: 3600000 });

  res.status(200).json({
    message: "User logged in successfully",
    user: {
      username: user.username,
      email: user.email,
      userId: user._id,
    },
    success: true,
  });
};

module.exports = { registerUserController, loginUserController };
