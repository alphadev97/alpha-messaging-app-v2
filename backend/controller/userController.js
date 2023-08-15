import express from "express";
import path from "path";
import upload from "../multer.js";
import userModel from "../model/userModel.js";
import ErrorHandler from "../utils/ErrorHandler.js";

const router = express.Router();

router.post("/create-user", upload.single("file"), async (req, res, next) => {
  const { name, email, password } = req.body;
  const userEmail = await userModel.findOne({ email });

  if (userEmail) {
    return next(new ErrorHandler("User already exists", 400));
  }

  const filename = req.file.filename;
  const fileUrl = path.join(filename);

  const user = {
    name: name,
    email: email,
    password: password,
    avatar: fileUrl,
  };

  const newUser = await userModel.create(user);
  res.status(201).json({
    success: true,
    newUser,
  });
});

export default router;
