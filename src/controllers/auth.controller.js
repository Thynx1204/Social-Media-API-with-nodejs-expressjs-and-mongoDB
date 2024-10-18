const AuthService = require("../services/auth.service");
const authService = new AuthService();
const userValidationSchema = require("../validation/user.validation");
class AuthController {
  async register(req, res) {
    try {
      const { error } = userValidationSchema.validate(req.body);

      if (error) {
        return res.status(400).json({
          success: false,
          message: error.details[0].message,
        });
      }

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

  async login(req, res) {
    try {
      const { error } = userValidationSchema.validate(req.body);

      if (error) {
        return res.status(400).json({
          success: false,
          message: error.details[0].message,
        });
      }

      const token = await authService.login(req.body);
      res.status(200).json({
        success: true,
        message: "Successfully authenticated.",
        data: { token },
      });
    } catch (error) {
      if (error.message === "User not found") {
        return res.status(404).json({
          success: false,
          message: error.message,
        });
      } else if (error.message === "Incorrect password") {
        return res.status(403).json({
          success: false,
          message: error.message,
        });
      } else {
        return res.status(500).json({
          success: false,
          message: "An unexpected error occurred",
        });
      }
    }
  }
}

module.exports = AuthController;
