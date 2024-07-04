const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    like: {
      type: Array,
      default: [],
    },
    comment: {
      type: Array,
      default: [],
    },
    post: {
      type: Array,
      default: [],
    },
    description: {
      type: String,
      // required: true,
    },
  },
  { timestamps: true }
);

const Posts = mongoose.model("posts", postSchema);
module.exports = Posts;
