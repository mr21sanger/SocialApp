const { Server } = require("socket.io");
let io;

const initializeSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST", "PUT", "DELETE"],
      credentials: true,
    },
  });

  io.on("connect", (socket) => {
    socket.on("userConnect", (data) => {
      if (data.userId && data.userName) {
        socket.join(data.userId);
        addUser(data.userId, data.userName, socket.id);
        sendOrQueue(data?.userId);
      }
      console.log(user);
    });

    socket.on("Read_Notification", ({ pendingStatus }) => {
      socket.emit("readed", { pendingStatus });
    });

    socket.on("join chat", (room) => {
      socket.join(room);
    });

    socket.on("chat_notification", (data) => {
      socket.emit("setChatNotification", data);
    });

    socket.on("chat_message", (data) => {
      const { chatData } = data;
      var chat = chatData?.chatId;
      if (!chat?.chatPersonId) return console.log("chat not found");

      chat?.chatPersonId.forEach((user) => {
        if (user == chatData?.senderId._id) return;
        socket.in(user).emit("message", chatData);
      });
    });

    socket.on("disconnect", () => {
      removeUser(socket.id);
    });
  });
};

let user = [];
let pendingNotifications = [];

// ADD USER WHEN CONNECTED TO THE APP
const addUser = (userId, userName, socketId) => {
  if (!user.some((u) => u.userId === userId)) {
    user.push({
      userId,
      userName,
      socketId,
    });
  }
};

//REMOVE USER WHEN DISCONNECT FROM THE APP

const removeUser = (socketId) => {
  user = user.filter((user) => user.socketId !== socketId); // Fixed filter operation
};

//GETTING USER BY THEIR USER ID TO GET THEIR SOCKET ID
const getUser = (userId) => {
  return user.find((user) => user.userId == userId);
};

// HANDELLLING THE PENDING NOTIFICATION OF THE DISCONNECTED USER

const sendOrQueue = (userId) => {
  const user = getUser(userId);
  const socketId = user?.socketId;
  const notifications = [
    pendingNotifications.find((user) => user.userId == userId),
  ];

  notifications?.map((currElem) => {
    io.to(socketId).emit("Pending_Notification", {
      pendingStatus: currElem?.pendingStatus,
    });
  });
};

// SETTING THE STATUS OF THE NOTIFICATION AND IF THE USER IS DISCONNECTED THEN QUEUEING THEM TO PENDING QUEUE

const setNotificationStatus = (userId) => {
  const user = getUser(userId);
  const socketId = user?.socketId;
  if (socketId) {
    io.to(user?.socketId).emit("Pending_Notification", { pendingStatus: true });
  } else {
    pendingNotifications.push({
      userId,
      pendingStatus: true,
    });
    console.log(pendingNotifications);
  }
};

module.exports = { initializeSocket, setNotificationStatus };
