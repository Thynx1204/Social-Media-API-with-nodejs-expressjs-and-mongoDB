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

  async updateUser(userData) {
    const { userId, userBio } = userData;

    if (!ObjectID.isValid(userId)) {
      throw new Error("Invalid user ID");
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { $set: { bio: userBio } },
      { new: true }
    ).select("-password");

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  }

  async deleteUser(userId) {
    if (!ObjectID.isValid(userId)) {
      throw new Error("Invalid user ID");
    }

    const user = await User.findByIdAndDelete(userId).select("-password");

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  }

  async followUser(userId, userIdToFollow) {
    if (!ObjectID.isValid(userId) || !ObjectID.isValid(userIdToFollow)) {
      throw new Error("Invalid user ID");
    }

    const [updatedUser, updatedUserToFollow] = await Promise.all([
      User.findByIdAndUpdate(
        userId,
        { $addToSet: { following: userIdToFollow } },
        { new: true }
      ).select("-password"),

      User.findByIdAndUpdate(
        userIdToFollow,
        { $addToSet: { followers: userId } },
        { new: true }
      ).select("-password"),
    ]);

    if (!updatedUser || !updatedUserToFollow) {
      throw new Error("User not found");
    }

    return {
      updatedUser,
      updatedUserToFollow,
    };
  }
}

module.exports = UserService;
