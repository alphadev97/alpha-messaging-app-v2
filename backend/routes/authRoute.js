import express from "express";
import { profile, signup } from "../controllers/authController.js";

const router = express.Router();

// http://localhost:5000/api/user/signup
router.post("/signup", signup);
// http://localhost:5000/api/user/profile
router.get("/profile", profile);

export default router;
