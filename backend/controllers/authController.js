import { UserModel } from "../models/User.js";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";

export const signup = async (req, res, next) => {
  const { username, password } = req.body;

  const hashedPassword = bcryptjs.hashSync(password, 10);

  const newUser = await UserModel.create({
    username,
    password: hashedPassword,
  });

  jwt.sign(
    { userId: newUser._id, username },
    process.env.JWT_SECRET_KEY,
    {},
    (err, token) => {
      if (err) throw err;

      res
        .cookie("token", token, { sameSite: "none", secure: true })
        .status(201)
        .json({
          id: newUser._id,
          message: "User is created successfully!",
        });
    }
  );

  try {
    await newUser.save();
    res.status(201).json({ message: "User is created successfully" });
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const validUser = await UserModel.findOne({ username });

    if (!validUser) return res.status(401).json({ message: "User not found" });

    const validPassword = bcryptjs.compareSync(password, validUser.password);

    if (!validPassword)
      return res.status(401).json({ message: "Wrong credentials" });

    jwt.sign(
      { userId: validUser._id, username },
      process.env.JWT_SECRET_KEY,
      {},
      (err, token) => {
        if (err) throw err;

        res
          .cookie("token", token, { sameSite: "None", secure: true })
          .status(201)
          .json({
            id: validUser._id,
            message: "User is logged in successfully!",
          });
      }
    );
  } catch (error) {
    next(error);
  }
};

export const profile = (req, res, next) => {
  const token = req.cookies?.token;

  if (token) {
    try {
      jwt.verify(token, process.env.JWT_SECRET_KEY, {}, (err, userData) => {
        if (err) throw err;

        res.json(userData);
      });
    } catch (error) {
      next(error);
    }
  } else {
    res.status(401).json("no token");
  }
};

export const logout = (req, res, next) => {
  try {
    res.cookie("token", "", { sameSite: "None", secure: true }).json("ok");
  } catch (error) {
    next(error);
  }
};
