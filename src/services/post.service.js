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

  async updatePost(postData, userId) {
    const { postId, message } = postData;

    if (!ObjectID.isValid(postId)) {
      throw new Error("Invalid post ID");
    }

    const post = await Post.findById(postId);

    if (!post) {
      throw new Error("Post not found");
    }

    if (post.posterId !== userId) {
      throw new Error("You are not authorized to update this post");
    }

    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      { $set: { message } },
      { new: true }
    );
  
    return updatedPost;
  }

  async deletePost(postId, userId) {
    if (!ObjectID.isValid(postId)) {
      throw new Error("Invalid post ID");
    }

    const post = await Post.findById(postId);

    if (!post) {
      throw new Error("Post not found");
    }

    if (post.posterId !== userId) {
      throw new Error("You are not authorized to delete this post");
    }
    await post.deleteOne();

    return post;
  }
}

module.exports = PostService;
