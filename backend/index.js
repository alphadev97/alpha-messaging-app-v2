import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRouter from "./routes/authRoute.js";

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

app.use(express.json());

app.get("/test", (req, res) => {
  res.json("test ok");
});

app.use("/api/user", authRouter);

app.listen(port, () => {
  console.log(`Backend is running on port ${port}`);
});
