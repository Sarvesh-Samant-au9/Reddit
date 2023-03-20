const mongoose = require("mongoose");
const PostSchema = new mongoose.Schema(
  {
    postTitle: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: 255,
    },
    postType: {
      type: String,
      required: [true, "Type of Post is required"],
    },
    postText: {
      type: String,
      required: [true, "Post cannot be empty"],
      trim: true,
    },
    postLink: {
      type: String,
      required: [true, "Link cannot be empty"],
    },
    postImage: {
      type: String,
      trim: true,
      required: [true, "Image is required"],
    },
    postCreated: {
      type: Date,
      default: Date.now,
    },
    postUpdated: {
      type: Date,
      default: Date.now,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    upVoted: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    downVoted: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

const PostModel = mongoose.model("Post", PostSchema);
module.exports = PostModel;
