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
}

module.exports = UserController;
