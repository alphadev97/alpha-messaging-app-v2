import express from "express";
import path from "path";
import upload from "../multer.js";
import userModel from "../model/userModel.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import fs from "fs";
import jwt from "jsonwebtoken";
import sendMail from "../utils/sendMail.js";
import catchAsyncErrors from "../middleware/catchAsyncErrors.js";
import sendToken from "../utils/JwtToken.js";
import { isAuthenticated } from "../middleware/auth.js";

const router = express.Router();

// create user

router.post("/create-user", upload.single("file"), async (req, res, next) => {
  const { name, email, password } = req.body;
  const userEmail = await userModel.findOne({ email });

  if (userEmail) {
    const filename = req.file.filename;
    const filepath = `uploads/${filename}`;
    fs.unlink(filepath, (err) => {
      if (err) {
        console.log(err);
        res.status(500).json({
          message: "Error in deleting file",
        });
      }
    });
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

  // const newUser = await userModel.create(user);
  // res.status(201).json({
  //   success: true,
  //   newUser,
  // });

  const activationToken = createActivationToken(user);

  const activationUrl = `http://localhost:3000/activation/${activationToken}`;

  try {
    await sendMail({
      email: user.email,
      subject: "Activate your account",
      message: `Hello ${user.name}, please click on the link to activate your account: ${activationUrl}`,
    });
    res.status(201).json({
      success: true,
      message: `please check your email:- ${user.email} to activate your account`,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// create activation token
const createActivationToken = (user) => {
  return jwt.sign(user, process.env.ACTIVATION_SECRET, {
    expiresIn: "5m",
  });
};

// activate user
router.post(
  "/activation",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { activation_token } = req.body;

      const newUser = jwt.verify(
        activation_token,
        process.env.ACTIVATION_SECRET
      );

      if (!newUser) {
        return next(new ErrorHandler("Invalid token", 400));
      }
      const { name, email, password, avatar } = newUser;

      let user = await userModel.findOne({ email });

      if (user) {
        return next(new ErrorHandler("User already exists", 400));
      }
      user = await userModel.create({
        name,
        email,
        avatar,
        password,
      });

      sendToken(user, 201, res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// login user
router.post(
  "/login-user",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return next(new ErrorHandler("Please provide the all fields!", 400));
      }

      const user = await userModel.findOne({ email }).select("+password");

      if (!user) {
        return next(new ErrorHandler("User doesn't exists!", 400));
      }

      const isPasswordValid = await user.comparePassword(password);

      if (!isPasswordValid) {
        return next(
          new ErrorHandler("Please provide correct information!", 400)
        );
      }

      sendToken(user, 201, res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// Load user
router.get(
  "/getuser",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const user = await userModel.findById(req.user.id);

      if (!user) {
        return next(new ErrorHandler("User doesn't exists!", 400));
      }

      res.status(200).json({
        success: true,
        user,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// Logout user
router.get(
  "/logout",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
      });

      res.status(201).json({
        success: true,
        message: "Logout Successfull",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

export default router;
