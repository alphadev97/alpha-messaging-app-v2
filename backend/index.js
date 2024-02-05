import express from "express";
import { createServer } from "node:http";
import cors from "cors";
import { Server } from "socket.io";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.use(cors());

const server = createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

console.log(process.env.CLIENT_URL);

app.use(express.json());

app.get("/", (req, res) => {
  res.json("Hello World");
});

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

server.listen(5500, () => {
  console.log("Server is running on port 5500");
});
