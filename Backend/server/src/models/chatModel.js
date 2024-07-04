const mongoose = require("mongoose");
const { array } = require("../middleware/multer");
const ChatSchema = new mongoose.Schema(
  {
    chatPersonId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    ],

    chatName: {
      type: String,
    },

    latestMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "message",
    },
  },
  { timestamps: true }
);

const ChatModel = mongoose.model("chat", ChatSchema);

module.exports = ChatModel;
