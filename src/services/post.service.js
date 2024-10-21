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
}

module.exports = PostService;
