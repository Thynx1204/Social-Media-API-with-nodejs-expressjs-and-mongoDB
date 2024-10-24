const AuthService = require("../services/auth.service");
const authService = new AuthService();
const {
  registerValidationSchema,
  loginValidationSchema,
} = require("../validation/user.validation");
const jsonResponse = require("../utils/jsonResponse");

class AuthController {
  async register(req, res) {
    try {
      const { error } = registerValidationSchema.validate(req.body);

      if (error) {
        res.status(400).json(jsonResponse(false, error.details[0].message));
      }

      const user = await authService.register(req.body);
      res.status(201).json(jsonResponse(true, "Successfully registered.", user._id));
    } catch (error) {
      res.status(400).json(jsonResponse(false, error.message));
    }
  }

  async login(req, res) {
    try {
      const { error } = loginValidationSchema.validate(req.body);

      if (error) {
      res.status(400).json(jsonResponse(false, error.details[0].message));
      }

      const token = await authService.login(req.body);
      //res.header('Authorization', `Bearer ${token}`);
      res.set("Authorization", `Bearer ${token}`);
      res.status(200).json(jsonResponse(true, "Successfully authenticated."));
    } catch (error) {
      if (error.message === "User not found") {
        res.status(404).json(jsonResponse(false, error.message));
      } else if (error.message === "Incorrect password") {
        res.status(403).json(jsonResponse(false, error.message));
      } else {
        res.status(500).json(jsonResponse(false, "An unexpected error occurred"));
      }
    }
  }

  async logout (req, res) {
    res.set('Authorization', '');
    res.status(200).json(jsonResponse(true, "Successfully logged out."));
  }
}

module.exports = AuthController;
