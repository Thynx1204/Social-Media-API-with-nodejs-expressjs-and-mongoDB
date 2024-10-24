const PostService = require("../services/post.service");
const postService = new PostService();
const postValidationSchema = require("../validation/post.validation");
const jsonResponse = require("../utils/jsonResponse");

class PostController {
  async createPost(req, res) {
    const { error } = postValidationSchema.validate(req.body);

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }

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

  async getAllPosts(req, res) {
    try {
      const posts = await postService.getAllPosts();
      res.status(200).json({
        success: true,
        message: "Posts retrieved successfully.",
        data: posts,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "An unexpected error occurs",
      });
    }
  }

  async getPostById(req, res) {
    const postId = req.params.id;

    try {
      const post = await postService.getPostById(postId);
      res.status(200).json({
        success: true,
        message: "Post retrieved successfully",
        data: post,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "An unexpected error occurs",
      });
    }
  }

  async getUserPosts(req, res) {
    const postId = req.params.id;

    try {
      const post = await postService.getUserPosts(postId);
      res.status(200).json({
        success: true,
        message: "Posts retrieved successfully",
        data: post,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "An unexpected error occurs",
      });
    }
  }

  async updatePost(req, res) {
    const postId = req.params.id;
    const message = req.body.message;
    const postData = { postId, message };
    const userId = req.user.id;

    try {
      const updatedPost = await postService.updatePost(postData, userId);

      res.status(200).json({
        success: true,
        message: "Post edit successfully",
        data: updatedPost,
      });
    } catch (error) {
      console.log(error);
      if (error.message === "Invalid post ID") {
        return res.status(400).json({
          success: false,
          message: error.message,
        });
      } else if (error.message === "Post not found") {
        return res.status(404).json({
          success: false,
          message: error.message,
        });
      } else if (
        error.message === "You are not authorized to update this post"
      ) {
        return res.status(403).json({
          success: false,
          message: error.message,
        });
      } else {
        return res.status(500).json({
          success: false,
          message: "An unexpected error occurs",
        });
      }
    }
  }

  async deletePost(req, res) {
    const postId = req.params.id;
    const userId = req.user.id;

    try {
      const post = await postService.deletePost(postId, userId);

      res.status(200).json({
        success: true,
        message: "Post deleted successfully",
        data: post,
      });
    } catch (error) {
      if (error.message === "Invalid post ID") {
        return res.status(400).json({
          success: false,
          message: error.message,
        });
      } else if (error.message === "Post not found") {
        return res.status(404).json({
          success: false,
          message: error.message,
        });
      } else if (
        error.message === "You are not authorized to delete this post"
      ) {
        return res.status(403).json({
          success: false,
          message: error.message,
        });
      } else {
        return res.status(500).json({
          success: false,
          message: "An unexpected error occurs",
        });
      }
    }
  }

  async likePost(req, res) {
    const userId = req.user.id;
    const posterId = req.params.id;

    try {
      const updatedPost = await postService.likePost(userId, posterId);

      res.status(200).json({
        success: true,
        message: "Post liked successfully",
        data: updatedPost,
      });
    } catch (error) {
      if (error.message === "Invalid post ID") {
        return res.status(400).json({
          success: false,
          message: error.message,
        });
      } else if (error.message === "Post not found") {
        return res.status(404).json({
          success: false,
          message: error.message,
        });
      } else {
        return res.status(500).json({
          success: false,
          message: "An unexpected error occurs",
        });
      }
    }
  }

  async unLikePost(req, res) {
    const userId = req.user.id;
    const posterId = req.params.id;

    try {
      const updatedPost = await postService.unLikePost(userId, posterId);

      res.status(200).json({
        success: true,
        message: "Post is successfully unliked",
        data: updatedPost,
      });
    } catch (error) {
      if (error.message === "Invalid post ID") {
        return res.status(400).json({
          success: false,
          message: error.message,
        });
      } else if (error.message === "Post not found") {
        return res.status(404).json({
          success: false,
          message: error.message,
        });
      } else if (error.message === "User has not liked this post") {
        return res.status(403).json({
          success: false,
          message: error.message,
        });
      } else {
        return res.status(500).json({
          success: false,
          message: "An unexpected error occurs",
        });
      }
    }
  }

  async commentPost(req, res) {
    const userId = req.user.id;
    const postId = req.params.id;
    const text = req.body.text;
    const postData = { postId, text };

    try {
      const updatedPost = await postService.commentPost(userId, postData);

      /* res.status(201).json({
        success: true,
        message: "Comment saved successfully",
        data: updatedPost,
      }); */

      // res.status(201).json(jsonResponse(true, "Comment saved successfully", updatedPost));
    } catch (error) {
      if (error.message === "Invalid post ID") {
        return res.status(400).json({
          success: false,
          message: error.message,
        });
      } else if (error.message === "Post not found") {
        return res.status(404).json({
          success: false,
          message: error.message,
        });
      } else {
        return res.status(500).json({
          success: false,
          message: "An unexpected error occurs",
        });
      }
    }
  }
}

module.exports = PostController;
