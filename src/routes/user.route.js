const UserController = require("../controllers/user.controller");
const userController = new UserController();
const router = require("express").Router();

router.get("/", userController.getAllUsers);

router.get("/:id", userController.getUserById);

router.put("/:id", userController.updateUser);

router.delete("/:id", userController.deleteUser);

router.patch("/follow/:id", userController.followUser)

module.exports = router;
