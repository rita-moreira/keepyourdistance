import express from "express";
import {
  signup,
  signin,
  signout,
  forgotPassword,
  resetPassword,
} from "../controllers/auth.js";
const router = express.Router();

//validators
import { runValidation } from "../validators/index.js";
import {
  userSignupValidator,
  userSigninValidator,
  forgotPasswordValidator,
  resetPasswordValidator,
} from "../validators/auth.js";

router.post("/signup", userSignupValidator, runValidation, signup);
router.post("/signin", userSigninValidator, runValidation, signin);
router.get("/signout", signout);
router.put(
  "/forgot-password",
  forgotPasswordValidator,
  runValidation,
  forgotPassword
);
router.put(
  "/reset-password",
  resetPasswordValidator,
  runValidation,
  resetPassword
);

export default router;
