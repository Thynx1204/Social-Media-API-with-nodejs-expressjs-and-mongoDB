const PostService = require("../services/post.service");
const postService = new PostService();

class PostController {
  async createPost(req, res) {
    const posterId = req.user.id;
    const { message, video } = req.body;
    const picture = "";
    const likers = [];
    const comments = [];

    try {
      const post = await postService.createPost({
        posterId,
        message,
        picture,
        video,
        likers,
        comments,
      });
      res.status(201).json({
        success: true,
        message: "Post created successfully",
        data: post,
      });
    } catch (error) {
      if (error.message === "Invalid user ID") {
        return res.status(400).json({
          success: false,
          message: error.message,
        });
      } else {
        return res.status(500).json({
          success: false,
          message: "An unexpected error occurred",
        });
      }
    }
  }
}

module.exports = PostController;
