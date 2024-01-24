import express from "express";
import { profile, signin, signup } from "../controllers/authController.js";

const router = express.Router();

// http://localhost:5000/api/user/signup
router.post("/signup", signup);
// http://localhost:5000/api/user/profile
router.get("/profile", profile);
// http://localhost:5000/api/user/signin
router.post("/signin", signin);

export default router;
