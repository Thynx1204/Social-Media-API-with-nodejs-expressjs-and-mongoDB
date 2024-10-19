const AuthController = require("../controllers/auth.controller");
const authController = new AuthController();
const router = require("express").Router();

router.post("/register", authController.register);

router.post("/login", authController.login);

router.get("/logout", authController.logout);


module.exports = router;
