const Post = require("../models/post.model");
const User = require("../models/user.model");
const ObjectID = require("mongoose").Types.ObjectId;

class PostService {
  async createPost(postData) {
    const { posterId, message, picture, video, likers, comments } = postData;

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

  async likePost(userId, postId) {
    if (!ObjectID.isValid(postId)) {
      throw new Error("Post not found");
    }

    const post = await Post.findById(postId);

    if (!post) {
      throw new Error("Post not found");
    }

    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      { $addToSet: { likers: userId } },
      { new: true }
    );

    await User.findByIdAndUpdate(
      userId,
      { $addToSet: { likes: postId } },
      { new: true }
    );

    return updatedPost;
  }

  async unLikePost(userId, postId) {
    if (!ObjectID.isValid(postId)) {
      throw new Error("Invalid post ID");
    }

    const post = await Post.findById(postId);

    if (!post) {
      throw new Error("Post not found");
    }

    if (!post.likers.includes(userId)) {
      throw new Error("User has not liked this post");
    }

    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      { $pull: { likers: userId } },
      { new: true }
    );

    await User.findByIdAndUpdate(
      userId,
      { $pull: { likes: postId } },
      { new: true }
    );

    return updatedPost;
  }

  async commentPost(userId, postData) {
    const { postId, text } = postData;
    const user = await User.findById(userId);

    if (!ObjectID.isValid(postId)) {
      throw new Error("Invalid post ID");
    }

    const post = await Post.findById(postId);

    if (!post) {
      throw new Error("Post not found");
    }

    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      {
        $push: {
          comments: {
            commenterId: user._id,
            commenterPseudo: user.pseudo,
            text,
            timestamp: new Date().getTime(),
          },
        },
      },
      { new: true }
    );

    return updatedPost;
  }

  async editCommentPost(userId, postData) {
    const { postId, text } = postData;
    const user = await User.findById(userId);

    if (!ObjectID.isValid(postId)) {
      throw new Error("Invalid post ID");
    }

    const post = await Post.findById(postId);

    if (!post) {
      throw new Error("Post not found");
    }

    if (post.comments.commenterId !== user.id) {
      throw new Error("You are not authorized to edit this comment");
    }

    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      {
        $set: {
          comments: {
            text,
            timestamp: new Date().getTime(),
          },
        },
      },
      { new: true }
    );

    return updatedPost;
  }
}

module.exports = PostService;
