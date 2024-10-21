const PostController = require("../controllers/post.controller");
const postController = new PostController();
const router = require("express").Router();

router.post("/", postController.createPost);

router.get("/", postController.getAllPosts);

router.get("/:id", postController.getAllById);

router.post("/user/:id", postController.getUserPosts);

module.exports = router;
