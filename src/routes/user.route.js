const UserController = require("../controllers/user.controller");
const userController = new UserController();
const router = require("express").Router();
const { isAdmin } = require("../middlewares/auth.middleware");


router.get("/", userController.getAllUsers);

router.get("/:id", userController.getUserById);

router.put("/", userController.updateUser);

router.delete("/:id", isAdmin, userController.deleteUser);

router.patch("/follow/:id", userController.followUser)

router.patch("/unfollow/:id", userController.unFollowUser)


module.exports = router;
