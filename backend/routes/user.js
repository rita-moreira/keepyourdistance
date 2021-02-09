import express from "express";
import { profile, update, listUsers } from "../controllers/user.js";
import { runValidation } from "../validators/index.js";
import { userInfoValidator } from "../validators/user.js";

const router = express.Router();

router.get("/user/:username", profile);
router.put("/user/update", userInfoValidator, runValidation, update);
router.get("/users", listUsers);
export default router;
