import express from "express";
import { addScore, getScores } from "../controllers/scoreController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ Match frontend
router.post("/", verifyToken, addScore);
router.get("/", verifyToken, getScores);

export default router;