import dotenv from "dotenv";
import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import { createServer } from "node:http";
import { Server } from "socket.io";

dotenv.config();
const app = express();

app.use(cors());

const server = createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.use(express.json());

app.get("/", (req, res) => {
  res.json("Hello World");
});

io.on("connection", (socket) => {
  socket.on("message", (message) => {
    io.emit("message", message);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

server.listen(5500, () => {
  console.log("Server is running on port 5500");
});
