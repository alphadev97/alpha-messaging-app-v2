import express from "express";
import authenticateToken from "../middlewares/authenticateToken.js";
import { getUserById } from "../controllers/userController.js";

const router = express.Router();

router.get("/view", authenticateToken, getUserById);

export default router;
