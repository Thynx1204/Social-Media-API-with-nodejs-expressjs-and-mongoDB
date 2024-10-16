const User = require("../models/user.model");
const ObjectID = require("mongoose").Types.ObjectId;

class UserService {
  async getAllUsers() {
    const users = await User.find().select("-password");
    return users;
  }
}

module.exports = UserService;
