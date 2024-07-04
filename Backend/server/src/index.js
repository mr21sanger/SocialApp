// index.js

require("./Database/database.js");
const express = require("express");
const cors = require("cors");
const userRouter = require("./Routers/userRoute.js");
const postRouter = require("./Routers/postRoute.js");
const chatRouter = require("./Routers/chatRoute.js");
const { Server } = require("socket.io");
const http = require("http");
const { initializeSocket } = require("./Routers/socket.js");

const app = express();
app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

const server = http.createServer(app);


initializeSocket(server);

app.use("/api", userRouter);
app.use("/api/post", postRouter);
app.use("/api/chat", chatRouter)

server.listen(3000, () => {
  console.log("server is running");
});

// module.exports = { app, io };
