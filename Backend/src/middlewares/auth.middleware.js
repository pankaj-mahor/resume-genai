const jwt = require("jsonwebtoken");
const blacklistTokenModel = require("../models/blacklist.model");

const authenticateToken = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res
      .status(401)
      .json({ message: "No Token present in the request", success: false });
  }

  const isTokenBlacklisted = await blacklistTokenModel.findOne({ token });

  if (isTokenBlacklisted) {
    return res
      .status(401)
      .json({ message: "Unauthorized Access", success: false });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    return next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid Token ", success: false });
  }
};

module.exports = { authenticateToken };
