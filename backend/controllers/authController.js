import bcryptjs from "bcryptjs";
import User from "../models/userModel.js";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);

  const newUser = new User({ username, email, password: hashedPassword });

  try {
    await newUser.save();
    res.status(201).json({ success: true, message: "User is created" });
  } catch (error) {
    console.log(error);
    next(error);
    res
      .status(401)
      .json({ success: false, message: "Problem in user creation" });
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(404, "User not found!"));

    const validPassword = await bcryptjs.compare(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, "Wrong credentials!"));
    console.log("authController:", process.env.JWT_SECRET);
    const token = jwt.sign({ userId: validUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    console.log("authControllerToken", token);

    res.cookie("authToken", token, { httpOnly: true, sameSite: "Strict" });

    res.status(200).json({ userId: validUser._id });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const signout = async (req, res, next) => {
  try {
    res.clearCookie("authToken");
    res
      .status(200)
      .json({ success: true, message: "User logout successfully!" });
  } catch (error) {
    next(error);
  }
};
