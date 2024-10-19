const jwt = require("jsonwebtoken");
require("dotenv").config();

function generateAccessToken(userId, userRole) {
  return jwt.sign({ userId, userRole }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "4h",
  });
}

function verifyAccessToken(token) {
  return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
}

module.exports = { generateAccessToken, verifyAccessToken };
