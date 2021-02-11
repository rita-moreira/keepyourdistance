import express from "express";
import { complete, list } from "../controllers/adminTask.js";
import { requireSignin } from "../controllers/auth.js";
import { runValidation } from "../validators/index.js";
import { AdminCompleteTaskValidator } from "../validators/adminTask.js";
const router = express.Router();

// to create a task we need an authenticated user
router.post(
  "/adminTask",
  requireSignin,
  AdminCompleteTaskValidator,
  runValidation,
  complete
);
// acess to all tasks
router.get("/adminTasks", list);
export default router;
