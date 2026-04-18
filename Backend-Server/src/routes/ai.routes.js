import { Router } from "express";
import { ai } from "../controllers/ai.controller.js";

const router = Router();

// POST request: frontend → backend (Express) → FastAPI ML model
router.post("/analyze", ai);

export default router;
