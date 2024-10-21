const Post = require("../models/post.model");
const ObjectID = require("mongoose").Types.ObjectId;

class PostService {
  async createPost(postData) {
    const { posterId, message, picture, video, likers, comments } = postData;

    if (!ObjectID.isValid(posterId)) {
      throw new Error("Invalid user ID");
    }

    const post = await Post.create({
      posterId,
      message,
      picture,
      video,
      likers,
      comments,
    });

    return post;
  }

  async getAllPosts() {
    const posts = await Post.find();
    return posts;
  }

  async getPostById(postId) {
    if (!ObjectID.isValid(postId)) {
      throw new Error("Invalid post ID");
    }

    const post = await Post.findById(postId);

    if (!post) {
      throw new Error("Post not found");
    }

    return post;
  }

  async getUserPosts(userId) {
    const posts = await Post.find({ posterId: userId });
    return posts;
  }

  async deletePost(postId) {
    if (!ObjectID.isValid(postId)) {
      throw new Error("Invalid post ID");
    }

    const post = await Post.findByIdAndDelete(postId);

    if (!post) {
      throw new Error("Post not found");
    }

    return post;
  }
}

module.exports = PostService;
