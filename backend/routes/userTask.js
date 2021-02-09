import express from "express";
import { accept } from "../controllers/userTask.js";
import { requireSignin } from "../controllers/auth.js";
import { runValidation } from "../validators/index.js";

const router = express.Router();

// to create a task we need an authenticated user
router.post("/userTask", requireSignin, runValidation, accept);

export default router;
