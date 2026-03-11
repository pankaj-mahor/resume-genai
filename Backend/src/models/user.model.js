const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: [true, "Username already exists"],
    required: [true, "Username is required"],
    minlength: [3, "Username must be at least 3 characters long"],
    maxlength: [20, "Username must be less than 20 characters long"],
  },
  email: {
    type: String,
    unique: [true, "Account already exists with this email"],
    required: [true, "Email is required"],
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please enter a valid email address"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    // minlength: [8, "Password must be at least 8 characters long"],
    // maxlength: [20, "Password must be less than 20 characters long"],
  },
});

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
