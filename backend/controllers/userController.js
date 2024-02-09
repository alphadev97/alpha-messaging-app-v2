import User from "../models/userModel.js";

export const getUserById = async (req, res, next) => {
  const userId = req.userId;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: true, message: "User not found!" });
    }

    delete user._doc.password;

    res.status(200).json({ success: true, message: "User", user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
