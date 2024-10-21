const PostController = require("../controllers/post.controller");
const postController = new PostController();
const router = require("express").Router();

router.post("/", postController.createPost);

router.get("/", postController.getAllPosts);

router.get("/:id", postController.getPostById);

router.get("/user/:id", postController.getUserPosts);

router.delete("/:id", postController.deletePost)

module.exports = router;
