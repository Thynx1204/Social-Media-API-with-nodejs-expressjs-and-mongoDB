const UserController = require("../controllers/user.controller");
const userController = new UserController();
const router = require("express").Router();
const { isAdmin } = require("../middlewares/auth.middleware");
const upload = require("../middlewares/multer.middleware");

router.get("/", userController.getAllUsers);

router.get("/:id", userController.getUserById);

router.put("/", userController.updateUser);

router.delete("/:id", isAdmin, userController.deleteUser);

router.delete("/", userController.deleteMyProfile);

router.patch("/follow", userController.followUser)

router.patch("/unfollow", userController.unFollowUser)

router.post("/upload", upload.single("file"), userController.uploadProfil);

module.exports = router;
