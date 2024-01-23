import { UserModel } from "../models/User.js";

export const signup = async (req, res, next) => {
  const { username, password } = req.body;

  const newUser = await UserModel.create({ username, password });

  try {
    await newUser.save();
    res.status(201).json({ message: "User is created successfully" });
  } catch (error) {
    next(error);
  }
};
