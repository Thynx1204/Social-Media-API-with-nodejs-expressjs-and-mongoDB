const User = require("../models/user.model");
const { hashPassword } = require("../utils/password.util");

class AuthService {
  async register(userData) {
    const { pseudo, email, password } = userData;
    const user = await User.create({
      pseudo,
      email,
      password: await hashPassword(password),
    });
    return user;
  }
}

module.exports = AuthService;
