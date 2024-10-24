const { verifyAccessToken } = require("../utils/jwt.util");

function verifyToken(req, res, next) {
  const authToken = req.headers.authorization;

  if (!authToken || !authToken.startsWith("Bearer ")) {
    res.status(403).json({
      success: false,
      message: "No token provided or invalid format.",
    });
    return;
  }

  const token = authToken.split(" ")[1];

  if (!token) {
    res.status(401).json({
      success: false,
      message: "Token missing.",
    });
    return;
  }

  try {
    const payload = verifyAccessToken(token);
    req.user = { id: payload.userId, role: payload.userRole };
    next();
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        success: false,
        message: "Invalid token.",
      });
    } else if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Token has expired.",
      });
    } else {
      return res.status(500).json({
        success: false,
        message: "An unexpected error occurred.",
      });
    }
  }
}

function isAdmin(req, res, next) {
  if (req.user.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Access denied. Admins only.",
    });
  }
  next();
}

module.exports = { verifyToken, isAdmin };
