import express from "express";
import { signup, signin, signout } from "../controllers/auth.js";
const router = express.Router();

//validators
import { runValidation } from "../validators/index.js";
import {
  userSignupValidator,
  userSigninValidator,
} from "../validators/auth.js";

router.post("/signup", userSignupValidator, runValidation, signup);
router.post("/signin", userSigninValidator, runValidation, signin);
router.get("/signout", signout);

export default router;
