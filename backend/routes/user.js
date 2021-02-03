import express from "express";
import { profile, update } from "../controllers/user.js";

const router = express.Router();

router.get("/user/:username", profile);
router.put("/user/update", update);

export default router;
