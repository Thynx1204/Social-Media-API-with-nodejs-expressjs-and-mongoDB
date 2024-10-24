const PostService = require("../services/post.service");
const postService = new PostService();
const postValidationSchema = require("../validation/post.validation");
const jsonResponse = require("../utils/jsonResponse");

class PostController {
  async createPost(req, res) {
    const { error } = postValidationSchema.validate(req.body);

    if (error) {
      res.status(400).json(jsonResponse(false, error.details[0].message));
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
      res.status(201).json(jsonResponse(true, "Post created successfully", post));
    } catch (error) {
      res.status(400).json(jsonResponse(false, error.message));
    }
  }

  async getAllPosts(req, res) {
    try {
      const posts = await postService.getAllPosts();
      res.status(200).json(jsonResponse(true, "Posts retrieved successfully.", posts));
    } catch (error) {
      res.status(500).json(jsonResponse(false, "An unexpected error occurs"));
    }
  }

  async getPostById(req, res) {
    const postId = req.params.id;

    try {
      const post = await postService.getPostById(postId);
      res.status(200).json(jsonResponse(true, "Posts retrieved successfully.", post));
    } catch (error) {
      if (error.message === "Invalid post ID") {
        res.status(400).json(jsonResponse(false, error.message));
      } else if (error.message === "Post not found") {
        res.status(404).json(jsonResponse(false, error.message));
      } else {
        res.status(500).json(jsonResponse(false, "An unexpected error occurs"));
      }
    }
  }

  async getUserPosts(req, res) {
    const postId = req.params.id;

    try {
      const posts = await postService.getUserPosts(postId);
      res.status(200).json(jsonResponse(true, "Posts retrieved successfully.", posts));
    } catch (error) {
      res.status(500).json(jsonResponse(false, "An unexpected error occurs"));
    }
  }

  async updatePost(req, res) {
    const postId = req.params.id;
    const message = req.body.message;
    const postData = { postId, message };
    const userId = req.user.id;

    try {
      const updatedPost = await postService.updatePost(postData, userId);
      res.status(200).json(jsonResponse(true, "Post edit successfully", updatedPost));
    } catch (error) {
      if (error.message === "Invalid post ID") {
        res.status(400).json(jsonResponse(false, error.message));
      } else if (error.message === "Post not found") {
        res.status(404).json(jsonResponse(false, error.message));
      } else if (
        error.message === "You are not authorized to update this post"
      ) {
        res.status(403).json(jsonResponse(false, error.message));
      } else {
        res.status(500).json(jsonResponse(false, "An unexpected error occurs"));
      }
    }
  }

  async deletePost(req, res) {
    const postId = req.params.id;
    const userId = req.user.id;

    try {
      const post = await postService.deletePost(postId, userId);
      res.status(200).json(jsonResponse(true, "Post deleted successfully", post));
    } catch (error) {
      if (error.message === "Invalid post ID") {
        res.status(400).json(jsonResponse(false, error.message));
      } else if (error.message === "Post not found") {
        res.status(404).json(jsonResponse(false, error.message));
      } else if (
        error.message === "You are not authorized to delete this post"
      ) {
        res.status(403).json(jsonResponse(false, error.message));
      } else {
        res.status(500).json(jsonResponse(false, "An unexpected error occurs"));
      }
    }
  }

  async likePost(req, res) {
    const userId = req.user.id;
    const posterId = req.params.id;

    try {
      const updatedPost = await postService.likePost(userId, posterId);
      res.status(200).json(jsonResponse(true, "Post liked successfully", updatedPost));
    } catch (error) {
      if (error.message === "Invalid post ID") {
        res.status(400).json(jsonResponse(false, error.message));
      } else if (error.message === "Post not found") {
        res.status(404).json(jsonResponse(false, error.message));
      } else {
        res.status(500).json(jsonResponse(false, "An unexpected error occurs"));
      }
    }
  }

  async unLikePost(req, res) {
    const userId = req.user.id;
    const posterId = req.params.id;

    try {
      const updatedPost = await postService.unLikePost(userId, posterId);
      res.status(200).json(jsonResponse(true, "Post is successfully unliked", updatedPost));
    } catch (error) {
      if (error.message === "Invalid post ID") {
        res.status(400).json(jsonResponse(false, error.message));
      } else if (error.message === "Post not found") {
        res.status(404).json(jsonResponse(false, error.message));
      } else if (error.message === "User has not liked this post") {
        res.status(403).json(jsonResponse(false, error.message));
      } else {
        res.status(500).json(jsonResponse(false, "An unexpected error occurs"));
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
      res.status(201).json(jsonResponse(true, "Comment saved successfully", updatedPost));
    } catch (error) {
      if (error.message === "Invalid post ID") {
        res.status(400).json(jsonResponse(false, error.message));
      } else if (error.message === "Post not found") {
        res.status(404).json(jsonResponse(false, error.message));
      } else {
        res.status(500).json(jsonResponse(false, "An unexpected error occurs"));
      }
    }
  }

  async editCommentPost(req, res) {
    const userId = req.user.id;
    const postId = req.params.postId;
    const commentId = req.params.commentId;
    const newText = req.body.text;
    const postData = { postId, commentId, newText };

    try {
      const updatedPost = await postService.editCommentPost(userId, postData);
      res.status(200).json(jsonResponse(true, "Comment edit successfully", updatedPost));
    } catch (error) {
      if (error.message === "Invalid post ID") {
        res.status(400).json(jsonResponse(false, error.message));
      } else if (error.message === "Invalid comment ID") {
        res.status(400).json(jsonResponse(false, error.message));
      } else if (error.message === "Post not found") {
        res.status(404).json(jsonResponse(false, error.message));
      } else if (error.message === "Comment not found") {
        res.status(404).json(jsonResponse(false, error.message));
      } else if (
        error.message === "You are not authorized to edit this comment"
      ) {
        res.status(403).json(jsonResponse(false, error.message));
      } else {
        res.status(500).json(jsonResponse(false, "An unexpected error occurs"));
      }
    }
  }

  async deleteCommentPost(req, res) {
    const userId = req.user.id;
    const postId = req.params.postId;
    const commentId = req.params.commentId;
    const postData = { postId, commentId };

    try {
      const updatedPost = await postService.deleteCommentPost(userId, postData);
      res.status(200).json(jsonResponse(true, "Comment edit successfully", updatedPost));
    } catch (error) {
      if (error.message === "Invalid post ID") {
        res.status(400).json(jsonResponse(false, error.message));
      } else if (error.message === "Invalid comment ID") {
        res.status(400).json(jsonResponse(false, error.message));
      } else if (error.message === "Post not found") {
        res.status(404).json(jsonResponse(false, error.message));
      } else if (error.message === "Comment not found") {
        res.status(404).json(jsonResponse(false, error.message));
      } else if (
        error.message === "You are not authorized to delete this comment"
      ) {
        res.status(403).json(jsonResponse(false, error.message));
      } else {
        res.status(500).json(jsonResponse(false, "An unexpected error occurs"));
      }
    }
  }
}

module.exports = PostController;
