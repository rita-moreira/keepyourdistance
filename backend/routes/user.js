import express from "express";
import { profile, update } from "../controllers/user.js";
import { runValidation } from "../validators/index.js";
import { userInfoValidator } from "../validators/user.js";
import multer from "multer";
const Storage = multer.diskStorage({
  destination: "./public/uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({
  storage: Storage,
}).single("photo");
const router = express.Router();

router.get("/user/:username", profile);
router.put("/user/update", userInfoValidator, runValidation, upload, update);

export default router;
