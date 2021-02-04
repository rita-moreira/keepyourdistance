import { check } from "express-validator";

export const userInfoValidator = [
  check("username")
    .not()
    .isEmpty()
    .withMessage("Username is required")
    .not()
    .matches(/[^(\d|\w)+$]/)
    .withMessage("Username cannot have spaces or special characters"),
  check("email").isEmail().withMessage("Must be a valid email address"),
  check("description")
    .isLength({ min: 4, max: 300 })
    .withMessage(
      "Descripton must be at least 4 characters long, and less than 300 characters"
    ),
  check("country").not().isEmpty().withMessage("Country is required"),
];
