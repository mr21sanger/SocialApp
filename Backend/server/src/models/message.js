const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  chatId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "chat",
  },
  content: {
    type: String,
  },
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
});

const MessageModel = mongoose.model("message", messageSchema);

module.exports = MessageModel;
