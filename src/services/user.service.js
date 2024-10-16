const User = require("../models/user.model");
const ObjectID = require("mongoose").Types.ObjectId;

class UserService {
  async getAllUsers() {
    const users = await User.find().select("-password");
    return users;
  }

  async getUserById(userId) {
    if (!ObjectID.isValid(userId)) {
      throw new Error("Invalid user ID");
    }

    const user = await User.findById(userId).select("-password");

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  }
}

module.exports = UserService;
