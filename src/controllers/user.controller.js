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
    const userId = request.params.id;
    try {
      const user = await userService.getUserById(userId);

      if (user) {
        res.status(200).json({
          success: true,
          status: 200,
          message: "User retrieved successfully",
          data: user,
        });
      } else {
        res.status(404).json({
          success: false,
          status: 404,
          message: "User profile not found.",
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        status: 500,
        message: `An error occurred while retrieving user with ID ${userId}.`,
      });
    }
  }
}

module.exports = UserController;
