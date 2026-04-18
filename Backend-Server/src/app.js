import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

// ✅ Allow frontend (5173) to talk to backend
app.use(cors({
  origin: `${process.env.CORS_ORIGIN}` || "http://localhost:5173",
  credentials: true
}));

// ✅ Parse JSON requests (important for POST body)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ✅ Static files (optional, if you serve images, docs, etc.)
app.use(express.static("public"));

// ✅ Routes
import aiRouter from "./routes/ai.routes.js";
app.use("/ai", aiRouter);

export { app };
