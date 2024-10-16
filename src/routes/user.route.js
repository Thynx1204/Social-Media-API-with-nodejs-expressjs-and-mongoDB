const UserController = require("../controllers/user.controller");
const userController = new UserController();
const router = require("express").Router();

router.get("/", userController.getAllUsers);

module.exports = router;
