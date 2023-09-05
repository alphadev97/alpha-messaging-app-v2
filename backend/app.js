import express from "express";
import dotenv from "dotenv";
import ErrorHandler from "./middleware/error.js";
const app = express();
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import user from "./controller/userController.js";
import shop from "./controller/shopController.js";
import product from "./controller/productController.js";
import event from "./controller/eventController.js";
import coupon from "./controller/couponCodeController.js";
import cors from "cors";

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use("/", express.static("uploads"));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

// config
if (process.env.NODE_ENV !== "PRODUCTION") {
  dotenv.config({
    path: "backend/config/.env",
  });
}

// import routes
app.use("/api/v2/user", user);
app.use("/api/v2/shop", shop);
app.use("/api/v2/product", product);
app.use("/api/v2/event", event);
app.use("/api/v2/coupon", coupon);

// ErrorHandling
app.use(ErrorHandler);

export default app;
