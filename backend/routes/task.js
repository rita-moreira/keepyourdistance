import express from "express";
import { create, list, remove } from "../controllers/task.js";
import { taskCreationValidator } from "../validators/task.js";
import { runValidation } from "../validators/index.js";
import { requireSignin } from "../controllers/auth.js";

const router = express.Router();

// to create a task we need an authenticated user
router.post(
  "/task",
  requireSignin,
  taskCreationValidator,
  runValidation,
  create
);
// acess to all tasks
router.get("/tasks", list);
// delete
router.delete("/task/:title", requireSignin, runValidation, remove);

export default router;
