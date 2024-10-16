const AuthService = require("../services/auth.service");
const authService = new AuthService();
class AuthController {
  async register(req, res) {
    try {
      const user = await authService.register(req.body);
      res.status(201).json({
        success: true,
        message: "Successfully registered.",
        data: user._id,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }
}

module.exports = AuthController;
