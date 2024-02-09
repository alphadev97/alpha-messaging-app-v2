import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const authenticateToken = async (req, res, next) => {
  const token = req.cookies.authToken;

  console.log("token", token);

  if (token == null) {
    return res
      .status(401)
      .json({ success: false, message: "token is required!" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const { userId } = decoded;

    console.log(decoded);
    console.log(userId);

    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthroized, invalid user!" });
    }

    req.userId = userId;
    next();
  } catch (error) {
    console.log(error);
    return res.status(403).json({ success: false, message: "Invalid token!" });
  }
};

export default authenticateToken;
