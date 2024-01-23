import express from "express";
import { profile, signup } from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", signup);
router.get("profile", profile);

export default router;
