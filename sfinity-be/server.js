import dotenv from "dotenv";

import http from "http";

import { Server } from "socket.io";

import app from "./app.js";

import connectDB from "./config/db.js";

dotenv.config();

if (process.env.NODE_ENV === "production") {
  console.log = () => {};
  console.info = () => {};
  console.debug = () => {};
}

/*
━━━━━━━━━━━━━━━━━━━
DATABASE
━━━━━━━━━━━━━━━━━━━
*/
connectDB();

/*
━━━━━━━━━━━━━━━━━━━
HTTP SERVER
━━━━━━━━━━━━━━━━━━━
*/
const server =
  http.createServer(app);

/*
━━━━━━━━━━━━━━━━━━━
SOCKET.IO
━━━━━━━━━━━━━━━━━━━
*/
export const io =
  new Server(server, {

    cors: {
      origin:
        "http://localhost:3000",

      methods:
        ["GET", "POST"],

    },

  });

/*
━━━━━━━━━━━━━━━━━━━
SOCKET CONNECTION
━━━━━━━━━━━━━━━━━━━
*/
io.on("connection", (socket) => {

  console.log(
    `User connected: ${socket.id}`
  );

  socket.on(
    "disconnect",
    () => {

      console.log(
        `User disconnected: ${socket.id}`
      );

    }
  );

});

/*
━━━━━━━━━━━━━━━━━━━
PORT
━━━━━━━━━━━━━━━━━━━
*/
const PORT =
  process.env.PORT || 5000;

/*
━━━━━━━━━━━━━━━━━━━
START SERVER
━━━━━━━━━━━━━━━━━━━
*/
server.listen(PORT, () => {

  console.log(
    `Server running on port ${PORT}`
  );

});