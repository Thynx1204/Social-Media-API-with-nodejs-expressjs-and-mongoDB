const UserController = require("../controllers/user.controller");
const userController = new UserController();
const router = require("express").Router();

router.get("/", userController.getAllUsers);

router.get("/:id", userController.getUserById);

module.exports = router;
