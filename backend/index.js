import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRouter from "./routes/authRoute.js";
import cors from "cors";

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

app.use((req, res, next) => {
  console.log("Request Origin:", req.get("Origin"));
  console.log("Allowed Origin:", process.env.CLIENT_URL);
  next();
});

app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  })
);

app.use(express.json());

app.get("/test", (req, res) => {
  res.json("test ok");
});

// http://localhost:5000/api/user/signup
app.use("/api/user", authRouter);

app.listen(port, () => {
  console.log(`Backend is running on port ${port}`);
});
