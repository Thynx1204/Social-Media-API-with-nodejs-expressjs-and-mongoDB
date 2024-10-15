const AuthService = require("../services/auth.service");

class AuthController {
  constructor() {
    this.authService = new AuthService();
  }
  async register(req, res) {
    try {
      const user = await this.authService.register(req.body);
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
