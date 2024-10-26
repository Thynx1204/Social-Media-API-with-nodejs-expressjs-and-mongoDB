const PostController = require("../controllers/post.controller");
const postController = new PostController();
const router = require("express").Router();
const { uploadPostPicture } = require("../middlewares/multer.middleware");

router.post("/", uploadPostPicture.single("file"), postController.createPost);

router.get("/", postController.getAllPosts);

router.get("/:id", postController.getPostById);

router.get("/user/:id", postController.getUserPosts);

router.put("/:id", postController.updatePost);

router.delete("/:id", postController.deletePost);

router.patch("/like/:id", postController.likePost);

router.patch("/unlike/:id", postController.unLikePost);

router.post("/:id/comment", postController.commentPost);

router.put("/:postId/comment/:commentId", postController.editCommentPost);

router.delete("/:postId/comment/:commentId", postController.deleteCommentPost);

module.exports = router;
