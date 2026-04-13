import express from "express";
import {
  getParticipation,
  participate,
} from "../controllers/drawcontroller.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/participation", verifyToken, getParticipation);
router.post("/participate", verifyToken, participate);

export default router;