import ErrorHandler from "../utils/ErrorHandler.js";
import catchAsyncErrors from "./catchAsyncErrors.js";
import jwt from "jsonwebtoken";
import userModel from "../model/userModel.js";
import shopModel from "../model/shopModel.js";

export const isAuthenticated = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next(new ErrorHandler("Please login to continue", 401));
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

  req.user = await userModel.findById(decoded.id);

  next();
});

export const isSeller = catchAsyncErrors(async (req, res, next) => {
  const { seller_token } = req.cookies;
  if (!seller_token) {
    return next(new ErrorHandler("Please login to continue", 401));
  }

  const decoded = jwt.verify(seller_token, process.env.JWT_SECRET_KEY);

  req.seller = await shopModel.findById(decoded.id);

  next();
});
