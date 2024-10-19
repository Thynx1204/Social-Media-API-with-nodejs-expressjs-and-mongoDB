const User = require("../models/user.model");
const { hashPassword, compare } = require("../utils/password.util");
const { generateAccessToken } = require("../utils/jwt.util");

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

  async login(userData) {
    const { email, password } = userData;

    const user = await User.findOne({ email });

    if (!user) throw new Error("User not found");

    if (await compare(password, user.password)) {
      return generateAccessToken(user._id, user.role);
    } else {
      throw new Error("Incorrect password");
    }
  }
}

module.exports = AuthService;
