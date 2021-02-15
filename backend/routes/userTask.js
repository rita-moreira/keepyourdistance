import express from "express";
import {
  accept,
  remove,
  update,
  list,
  comment,
} from "../controllers/userTask.js";
import { requireSignin } from "../controllers/auth.js";
import { runValidation } from "../validators/index.js";
import { AdminCompleteTaskValidator } from "../validators/adminTask.js";
const router = express.Router();

// to create a task we need an authenticated user
router.post("/userTask", requireSignin, runValidation, accept);
router.delete("/userTask/:title", requireSignin, runValidation, remove);
router.put(
  "/userTask/update",
  AdminCompleteTaskValidator,
  runValidation,
  update
);
router.put("/userComments", requireSignin, runValidation, comment);

// acess to all tasks
router.get("/userTasks", list);

export default router;
