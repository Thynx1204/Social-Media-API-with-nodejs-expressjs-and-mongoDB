const PostController = require("../controllers/post.controller");
const postController = new PostController();
const router = require("express").Router();

router.post("/", postController.createPost);

module.exports = router;
