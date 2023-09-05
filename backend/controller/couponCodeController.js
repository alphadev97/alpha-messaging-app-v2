import express from "express";
import catchAsyncErrors from "../middleware/catchAsyncErrors.js";
import shopModel from "../model/shopModel.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import { isSeller } from "../middleware/auth.js";
import couponCodeModel from "../model/couponCodeModel.js";
const router = express.Router();

// create coupon code
router.post(
  "/create-coupon-code",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const isCouponCode = await couponCodeModel.find({ name: req.body.name });

      if (isCouponCode.length !== 0) {
        return next(new ErrorHandler("Coupon code already exist!", 400));
      }

      const CouponCode = await couponCodeModel.create(req.body);

      res.status(201).json({
        success: true,
        CouponCode,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// get all coupon codes of a shop
router.get(
  "/get-coupon/:id",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const couponCodes = await couponCodeModel.find({
        shop: {
          _id: req.params.id,
        },
      });

      res.status(201).json({
        success: true,
        couponCodes,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

export default router;
