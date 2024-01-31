import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRouter from "./routes/authRoute.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import WebSocket, { WebSocketServer } from "ws";
import jwt from "jsonwebtoken";
import Message from "./models/Message.js";
import { UserModel } from "./models/User.js";
import fs from "fs";
import url from "url";
import path from "path";

dotenv.config();

const app = express();
const port = 5000;

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log(error);
  });

app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  })
);

// image

// Get the current module's URL
const currentModuleUrl = new URL(import.meta.url);
// Extract the directory path
const currentModuleDir = path.dirname(currentModuleUrl.pathname);
// Construct the full path to the uploads directory
const uploadsDir = path.join(currentModuleDir, "uploads");

app.use("/uploads", express.static(currentModuleDir + "/uploads"));

app.use(express.json());
app.use(cookieParser());

const getUserDataFromRequest = async (req) => {
  return new Promise((resolve, reject) => {
    const token = req.cookies?.token;

    if (token) {
      jwt.verify(token, process.env.JWT_SECRET_KEY, {}, (err, userData) => {
        if (err) throw err;

        resolve(userData);
      });
    } else {
      reject("no token");
    }
  });
};

app.get("/test", (req, res) => {
  res.json("test ok");
});

// http://localhost:5000/api/user/signup
app.use("/api/user", authRouter);

// http://localhost:5000/messages/:userId
app.get("/messages/:userId", async (req, res) => {
  const { userId } = req.params;
  const userData = await getUserDataFromRequest(req);
  const ourUserId = userData.userId;

  const messages = await Message.find({
    sender: { $in: [userId, ourUserId] },
    recipient: { $in: [userId, ourUserId] },
  }).sort({ createdAt: 1 });

  res.json(messages);
});

app.get("/people", async (req, res) => {
  const users = await UserModel.find({}, { _id: 1, username: 1 });
  res.json(users);
});

const server = app.listen(port, () => {
  console.log(`Backend is running on port ${port}`);
});

// Websocket
const wss = new WebSocketServer({ server });
wss.on("connection", (connection, req) => {
  const notifyAboutOnlinePeople = () => {
    // Show online users
    [...wss.clients].forEach((client) => {
      client.send(
        JSON.stringify({
          online: [...wss.clients].map((c) => ({
            userId: c.userId,
            username: c.username,
          })),
        })
      );
    });
  };

  connection.isAlive = true;

  connection.timer = setInterval(() => {
    connection.ping();
    connection.deathTimer = setTimeout(() => {
      connection.isAlive = false;
      clearInterval(connection.timer);
      connection.terminate();
      notifyAboutOnlinePeople();
      console.log("dead");
    }, 1000);
  }, 5000);

  connection.on("pong", () => {
    clearTimeout(connection.deathTimer);
  });

  // fecth username and id from cookies
  const cookies = req.headers.cookie;

  if (cookies) {
    const tokenCookieString = cookies
      .split(";")
      .find((str) => str.startsWith("token="));

    if (tokenCookieString) {
      const token = tokenCookieString.split("=")[1];

      if (token) {
        jwt.verify(token, process.env.JWT_SECRET_KEY, {}, (err, userData) => {
          if (err) throw err;
          const { userId, username } = userData;

          connection.userId = userId;
          connection.username = username;
        });
      }
    }
  }

  connection.on("message", async (message) => {
    const messageData = JSON.parse(message.toString());
    const { recipient, text, file } = messageData;
    let fileName = null;

    if (file) {
      const parts = file.name.split(".");
      const ext = parts[parts.length - 1];
      fileName = Date.now() + "." + ext;

      // Get the current module's URL
      const currentModuleUrl = new URL(import.meta.url);
      // Extract the directory path
      const currentModuleDir = path.dirname(currentModuleUrl.pathname);
      // Construct the full path to the uploads directory
      const uploadsDir = path.join(currentModuleDir, "uploads");
      // Construct the full path to the file
      const filePath = path.join(uploadsDir, fileName);

      const bufferData = Buffer.from(file.data.split(",")[1], "base64");

      fs.writeFile(filePath, bufferData, () => {
        console.log("file saved:" + filePath);
      });
    }

    if (recipient && (text || file)) {
      const messageDoc = await Message.create({
        sender: connection.userId,
        recipient,
        text,
        file: file ? fileName : null,
      });

      [...wss.clients]
        .filter((c) => c.userId === recipient)
        .forEach((c) =>
          c.send(
            JSON.stringify({
              text,
              sender: connection.userId,
              recipient,
              file: file ? fileName : null,
              _id: messageDoc._id,
            })
          )
        );
    }
  });

  notifyAboutOnlinePeople();
});
