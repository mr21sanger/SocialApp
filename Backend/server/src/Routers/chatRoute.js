const express = require("express");
const ChatModel = require("../models/chatModel");
const UserModel = require("../models/users");
const MessageModel = require("../models/message");
const { log } = require("console");
const router = express.Router();

router.route("/:id").post(async (req, res) => {
  try {
    const userId = req.params.id;
    const { currentUser } = req.body;
    console.log(currentUser, userId);
    let isChat = await ChatModel.find({
      $and: [
        { chatPersonId: { $elemMatch: { $eq: currentUser } } },
        { chatPersonId: { $elemMatch: { $eq: userId } } },
      ],
    })
      .populate("chatPersonId", "firstName lastName bio pfp")
      .populate("latestMessage");

    isChat = await UserModel.populate(isChat, {
      path: "latestMessage.sender",
      select: "name pfp email",
    });

    if (isChat.length > 0) {
      return res.status(201).json({ status: true, data: isChat[0] });
    } else {
      var chatData = {
        chatName: "sender",
        chatPersonId: [currentUser, userId],
      };
      const createdChat = await ChatModel.create(chatData);

      const finalChat = await ChatModel.find({ _id: createdChat._id }).populate(
        "chatPersonId",
        "-password"
      );

      console.log(finalChat);
      return res.status(201).json({ status: true, data: finalChat });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: false, error });
  }
});

router.route("/fetchChats/:id").get(async (req, res) => {
  try {
    const { id } = req.params;
    let chats = await ChatModel.find({
      chatPersonId: { $elemMatch: { $eq: id } },
    })
      .populate("chatPersonId", "firstName lastName bio pfp")
      .populate("latestMessage")
      .sort({ updatedAt: -1 });

    chats = await UserModel.populate(chats, {
      path: "latestMessage.sender",
      select: "name pfp email",
    });
    return res.status(201).json({ status: true, data: chats });
  } catch (error) {}
});

router.route("/sendMessage/:senderId").post(async (req, res) => {
  try {
    const { senderId } = req.params;
    const { content, id } = req.body;
    const newMessage = {
      senderId,
      content,
      chatId: id,
    };

    let message = await MessageModel.create(newMessage);
    message = await message.populate("chatId");
    message = await message.populate(
      "senderId",
      "firstName lastName pfp email"
    );

    message = await UserModel.populate(message, {
      path: "chat.chatPersonId",
      select: "firstName lastName pfp bio email",
    });

    await ChatModel.findByIdAndUpdate(id, {
      latestMessage: message,
    });

    return res.status(201).json({ status: true, data: message });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: false, error });
  }
});
router.route("/getMessage/:chatId").get(async (req, res) => {
  try {
    const {chatId} = req.params;
    const data = await MessageModel.find({ chatId })
      .populate("senderId", "firstName LastName pfp bio")
      .populate("chatId");
    return res.status(201).json({ status: true, data });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: false, error });
  }
});

module.exports = router;
