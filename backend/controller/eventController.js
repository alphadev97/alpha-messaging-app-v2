import express from "express";
import catchAsyncErrors from "../middleware/catchAsyncErrors.js";
import upload from "../multer.js";
import shopModel from "../model/shopModel.js";
import eventModel from "../model/eventModel.js";
import ErrorHandler from "../utils/ErrorHandler.js";
const router = express.Router();

// create event
router.post(
  "/create-event",
  upload.array("images"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const shopId = req.body.shopId;
      const shop = await shopModel.findById(shopId);

      if (!shop) {
        return next(new ErrorHandler("Shop Id is invalid", 400));
      } else {
        const files = req.files;
        const imageUrls = files.map((file) => `${file.filename}`);
        const eventData = req.body;
        eventData.images = imageUrls;
        eventData.shop = shop;

        // const product = new productModel(productData);
        // await product.save();

        const product = await eventModel.create(eventData);

        res.status(201).json({
          success: true,
          product,
        });
      }
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

export default router;
