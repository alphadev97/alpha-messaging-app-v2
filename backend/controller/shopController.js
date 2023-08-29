import express from "express";
import path from "path";
const router = express.Router();
import upload from "../multer.js";
import fs from "fs";
import jwt from "jsonwebtoken";
import sendMail from "../utils/sendMail.js";
import sendToken from "../utils/JwtToken.js";
import { isAuthenticated } from "../middleware/auth.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import shopModel from "../model/shopModel.js";
import catchAsyncErrors from "../middleware/catchAsyncErrors.js";
import sendShopToken from "../utils/shopToken.js";

// Create Shop
router.post("/create-shop", upload.single("file"), async (req, res, next) => {
  try {
    const { email } = req.body;
    const sellerEmail = await shopModel.findOne({ email });

    if (sellerEmail) {
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
      return next(new ErrorHandler("Shop already exists", 400));
    }

    const filename = req.file.filename;
    const fileUrl = path.join(filename);

    const seller = {
      name: req.body.name,
      email: email,
      password: req.body.password,
      avatar: fileUrl,
      phoneNumber: req.body.phoneNumber,
      address: req.body.address,
      zipCode: req.body.zipCode,
    };

    const activationToken = createActivationToken(seller);

    const activationUrl = `http://localhost:3000/seller/activation/${activationToken}`;

    try {
      await sendMail({
        email: seller.email,
        subject: "Activate your shop",
        message: `Hello ${seller.name}, please click on the link to activate your shop: ${activationUrl}`,
      });
      res.status(201).json({
        success: true,
        message: `please check your email:- ${seller.email} to activate your shop`,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// create activation token
const createActivationToken = (seller) => {
  return jwt.sign(seller, process.env.ACTIVATION_SECRET, {
    expiresIn: "5m",
  });
};

// activate user
router.post(
  "/activation",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { activation_token } = req.body;

      const newSeller = jwt.verify(
        activation_token,
        process.env.ACTIVATION_SECRET
      );

      if (!newSeller) {
        return next(new ErrorHandler("Invalid token", 400));
      }
      const { name, email, password, phoneNumber, address, zipCode, avatar } =
        newSeller;

      let seller = await shopModel.findOne({ email });

      if (seller) {
        return next(new ErrorHandler("Seller already exists", 400));
      }
      seller = await shopModel.create({
        name,
        email,
        avatar,
        password,
        phoneNumber,
        address,
        zipCode,
      });

      sendShopToken(seller, 201, res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// Login Shop
router.post(
  "/login-shop",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return next(new ErrorHandler("Please provide the all fields!", 400));
      }

      const seller = await shopModel.findOne({ email }).select("+password");

      if (!seller) {
        return next(new ErrorHandler("User doesn't exists!", 400));
      }

      const isPasswordValid = await seller.comparePassword(password);

      if (!isPasswordValid) {
        return next(
          new ErrorHandler("Please provide correct information!", 400)
        );
      }

      sendShopToken(seller, 201, res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

export default router;
