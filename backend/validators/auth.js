import { check } from "express-validator";

export const userSignupValidator = [
  check("username")
    .not()
    .isEmpty()
    .withMessage("Username is required")
    .not()
    .matches(/[^(\d|\w)+$]/)
    .withMessage("Username cannot have spaces or special characters"),
  check("email").isEmail().withMessage("Must be a valid email address"),
  check("password")
    .isLength({ min: 8, max: 30 })
    .withMessage(
      "Password must be at least 6 characters long, and less than 30 characters"
    )
    .matches(/\d/)
    .withMessage("Password must contain a number"),
  check("confirmPassword")
    .custom((value, { req }) => {
      if (value === req.body.password) {
        return true;
      } else {
        return false;
      }
    })
    .withMessage("Passwords don't match."),
];

export const userSigninValidator = [
  check("email").isEmail().withMessage("Must be a valid email address"),
  check("password")
    .isLength({ min: 8, max: 30 })
    .withMessage(
      "Password must be at least 6 characters long, and less than 30 characters"
    )
    .matches(/\d/)
    .withMessage("Password must contain a number"),
];

// forgot password

export const forgotPasswordValidator = [
  check("email")
    .not()
    .isEmpty()
    .isEmail()
    .withMessage("Must be a valid email address"),
];

// reset password
export const resetPasswordValidator = [
  check("newPassword")
    .not()
    .isEmpty()
    .isLength({ min: 8, max: 30 })
    .withMessage(
      "Password must be at least 6 characters long, and less than 30 characters"
    )
    .matches(/\d/)
    .withMessage("Password must contain a number"),
];
