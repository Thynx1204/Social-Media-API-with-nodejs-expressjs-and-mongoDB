const UserService = require("../services/user.service");
const userService = new UserService();

class UserController {
  async getAllUsers(req, res) {
    try {
      const users = await userService.getAllUsers();
      res.status(200).json({
        success: true,
        message: "Users retrieved successfully.",
        data: users,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "An unexpected error occurs",
      });
    }
  }

  async getUserById(req, res) {
    const userId = req.params.id;
    try {
      const user = await userService.getUserById(userId);
      res.status(200).json({
        success: true,
        message: "User retrieved successfully",
        data: user,
      });
    } catch (error) {
      res.status(404).json({
        success: false,
        message: error.message,
      });
    }
  }

  async updateUser(req, res) {
    try {
      const userId = req.params.id;
      const userBio = req.body.bio;
      const user = await userService.updateUser({ userId, userBio });

      res.status(200).json({
        success: true,
        message: "User edit successfully",
        data: user,
      });
    } catch (error) {
      if (error.message === "Invalid user ID") {
        return res.status(400).json({
          success: false,
          message: error.message,
        });
      }

      res.status(404).json({
        success: false,
        message: error.message,
      });
    }
  }

  async deleteUser(req, res) {
    try {
      const userId = req.params.id;
      const user = await userService.deleteUser(userId);

      res.status(200).json({
        success: true,
        message: "User deleted successfully",
        data: user,
      });
    } catch (error) {
      if (error.message === "Invalid user ID") {
        return res.status(400).json({
          success: false,
          message: error.message,
        });
      } else if (error.message === "User not found") {
        return res.status(404).json({
          success: false,
          message: error.message,
        });
      } else {
        return res.status(500).json({
          success: false,
          message: "An unexpected error occurs",
        });
      }
    }
  }

  async followUser(req, res) {
    const userId = req.params.id;
    const userIdToFollow = req.body.userIdToFollow;
    try {
      const [updatedUser, updatedUserToFollow] = await userService.followUser(
        userId,
        userIdToFollow
      );
      res.status(200).json({
        success: true,
        message: "User successfully followed",
        data: {
          updatedUser,
          updatedUserToFollow,
        },
      });
    } catch (error) {
      if (error.message === "Invalid user ID") {
        return res.status(400).json({
          success: false,
          message: error.message,
        });
      } else if (error.message === "User not found") {
        return res.status(404).json({
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

  async unfollowUser(req, res) {
    const userId = req.params.id;
    const userIdToUnFollow = req.body.userIdToUnFollow;
    try {
      const [updatedUser, updatedUserToUnFollow] = await userService.unFollowUser(
        userId,
        userIdToUnFollow
      );
      res.status(200).json({
        success: true,
        message: "User successfully unfollowed",
        data: {
          updatedUser,
          updatedUserToUnFollow,
        },
      });
    } catch (error) {
      if (error.message === "Invalid user ID") {
        return res.status(400).json({
          success: false,
          message: error.message,
        });
      } else if (error.message === "User not found") {
        return res.status(404).json({
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

module.exports = UserController;
