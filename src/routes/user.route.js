const UserController = require("../controllers/user.controller");
const userController = new UserController();
const router = require("express").Router();

router.get("/", userController.getAllUsers);

router.get("/:id", userController.getUserById);

router.put("/:id", userController.updateUser);

module.exports = router;
