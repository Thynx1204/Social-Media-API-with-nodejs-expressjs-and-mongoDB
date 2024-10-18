const jwt = require("jsonwebtoken");
require("dotenv").config();

export function generateAccessToken(userId) {
  return jwt.sign({ userId}, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "4h",
  });
}

export function verifyAccessToken(token) {
  return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
}
