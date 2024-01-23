import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
    },
    password: String,
  },
  { timestamps: true }
);

export const UserModel = mongoose.Model("User", UserSchema);
