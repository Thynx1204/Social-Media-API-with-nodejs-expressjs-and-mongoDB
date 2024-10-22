const PostController = require("../controllers/post.controller");
const postController = new PostController();
const router = require("express").Router();

router.post("/", postController.createPost);

router.get("/", postController.getAllPosts);

router.get("/:id", postController.getPostById);

router.get("/user/:id", postController.getUserPosts);

router.put("/:id", postController.updatePost);

router.delete("/:id", postController.deletePost)

router.patch("/like/:id", postController.likePost)

module.exports = router;
