const User = require("../models/user.model");
const { hashPassword } = require("../utils/password.util");

class AuthService {
  async register(userData) {
    const { pseudo, email, password } = userData;

    const existingUser = await User.findOne({
      $or: [{ pseudo }, { email }],
    });

    if (existingUser) {
      throw new Error(
        existingUser.pseudo === pseudo
          ? "Le pseudo est déjà pris"
          : "L'e-mail est déjà enregistré"
      );
    }

    const user = await User.create({
      pseudo,
      email,
      password: await hashPassword(password),
    });
    return user;
  }
}

module.exports = AuthService;
