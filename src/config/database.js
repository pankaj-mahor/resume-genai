const mongoose = require("mongoose");

const connectToDB = async () => {
  console.log("Connecting to MongoDB");
  try {
    await mongoose.connect(process.env.DB_COMPASS_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Error connecting to MongoDB", error);
    process.exit(1);
  }
};

module.exports = connectToDB;
