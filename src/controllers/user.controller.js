const UserService = require("../services/user.service");
const userService = new UserService();
const jsonResponse = require("../utils/jsonResponse");

class UserController {
  async getAllUsers(req, res) {
    try {
      const users = await userService.getAllUsers();

      res.status(200).json(jsonResponse(true, "Users retrieved successfully.", users));
    } catch (error) {
      res.status(500).json(jsonResponse(false, "An unexpected error occurs"));
    }
  }

  async getUserById(req, res) {
    const userId = req.params.id;
    try {
      const user = await userService.getUserById(userId);

      res.status(200).json(jsonResponse(true, "User retrieved successfully.", user));
    } catch (error) {
      res.status(404).json(jsonResponse(false, error.message));
    }
  }

  async updateUser(req, res) {
    const userId = req.user.id;
    const userBio = req.body.bio;
    try {
      const user = await userService.updateUser({ userId, userBio });

      res.status(200).json(jsonResponse(true, "User edit successfully.", user));
    } catch (error) {
      if (error.message === "Invalid user ID") {
        res.status(400).json(jsonResponse(false, error.message));
      } else if (error.message === "User not found") {
        res.status(404).json(jsonResponse(false, error.message));
      } else {
        res.status(500).json(jsonResponse(false, "An unexpected error occurred"));
      }
    }
  }

  async deleteUser(req, res) {
    const userId = req.params.id;

    try {
      const user = await userService.deleteUser(userId);

      res.status(200).json(jsonResponse(true, "User deleted successfully", user));
    } catch (error) {
      if (error.message === "Invalid user ID") {
        res.status(400).json(jsonResponse(false, error.message));
      } else if (error.message === "User not found") {
        res.status(404).json(jsonResponse(false, error.message));
      } else {
        res.status(500).json(jsonResponse(false, "An unexpected error occurred"));
      }
    }
  }

  async followUser(req, res) {
    const userId = req.user.id;
    const userIdToFollow = req.body.userIdToFollow;
    try {
      const [updatedUser, updatedUserToFollow] = await userService.followUser(
        userId,
        userIdToFollow
      );

      res.status(200).json(jsonResponse(true, "User successfully followed", { updatedUser, updatedUserToFollow }));
    } catch (error) {
      if (error.message === "Invalid user ID") {
        res.status(400).json(jsonResponse(false, error.message));
      } else if (error.message === "User not found") {
        res.status(404).json(jsonResponse(false, error.message));
      } else {
        res.status(500).json(jsonResponse(false, "An unexpected error occurred"));
      }
    }
  }

  async unFollowUser(req, res) {
    const userId = req.user.id;
    const userIdToUnFollow = req.body.userIdToUnFollow;
    try {
      const [updatedUser, updatedUserToUnFollow] = await userService.unFollowUser(
        userId,
        userIdToUnFollow
      );

      res.status(200).json(jsonResponse(true, "User successfully followed", { updatedUser, updatedUserToUnFollow }));
    } catch (error) {
      if (error.message === "Invalid user ID") {
        res.status(400).json(jsonResponse(false, error.message));
      } else if (error.message === "User not found") {
        res.status(404).json(jsonResponse(false, error.message));
      } else {
        res.status(500).json(jsonResponse(false, "An unexpected error occurred"));
      }
    }
  }

  async deleteMyProfile(req, res) {
    try {
      const userId = req.user.id;
      const user = await userService.deleteUser(userId);

      res.status(200).json(jsonResponse(true, "User successfully followed", { updatedUser, updatedUserToUnFollow }));
    } catch (error) {
      if (error.message === "Invalid user ID") {
        res.status(400).json(jsonResponse(false, error.message));
      } else if (error.message === "User not found") {
        res.status(404).json(jsonResponse(false, error.message));
      } else {
        res.status(500).json(jsonResponse(false, "An unexpected error occurred"));
      }
    }
  }
}

module.exports = UserController;
