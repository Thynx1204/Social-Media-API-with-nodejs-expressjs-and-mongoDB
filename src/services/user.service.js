const User = require("../models/user.model");
const ObjectID = require("mongoose").Types.ObjectId;
const path = require("path");
require('dotenv').config();
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

  async uploadProfil(userData) {
    const { userId, picture } = userData;

    const uploadPath = process.env.UPLOADS_PATH || path.join(__dirname, "../uploads");

    const filePath = picture ? path.join(uploadPath, picture.filename) : "";

    const user = await User.findByIdAndUpdate(
      userId,
      { $set: { picture: filePath } },
      { new: true }
    ).select("-password");

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

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $addToSet: { following: userIdToFollow } },
      { new: true }
    ).select("-password");

    const updatedUserToFollow = await User.findByIdAndUpdate(
      userIdToFollow,
      { $addToSet: { followers: userId } },
      { new: true }
    ).select("-password");

    if (!updatedUser || !updatedUserToFollow) {
      throw new Error("User not found");
    }

    return [updatedUser, updatedUserToFollow];
  }

  async unFollowUser(userId, userIdToUnFollow) {
    if (!ObjectID.isValid(userId) || !ObjectID.isValid(userIdToUnFollow)) {
      throw new Error("Invalid user ID");
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $pull: { following: userIdToUnFollow } },
      { new: true }
    ).select("-password");

    const updatedUserToUnFollow = await User.findByIdAndUpdate(
      userIdToUnFollow,
      { $pull: { followers: userId } },
      { new: true }
    ).select("-password");

    if (!updatedUser || !updatedUserToUnFollow) {
      throw new Error("User not found");
    }

    return [updatedUser, updatedUserToUnFollow];
  }
}

module.exports = UserService;
