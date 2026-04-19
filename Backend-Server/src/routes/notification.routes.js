import { Router } from "express";
import { sendNotification } from "../controllers/notification.controller.js";

const router = Router();

// POST request: send email alert with dashboard data
router.post("/send-alert", sendNotification);

export default router;
