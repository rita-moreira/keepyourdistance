import { check } from "express-validator";

export const taskCreationValidator = [
  check("title")
    .not()
    .isEmpty()
    .withMessage("Title is required")
    .isLength({ min: 10 })
    .withMessage("Title must be at least 10 characters long"),
  check("description")
    .not()
    .isEmpty()
    .withMessage("Description is required")
    .isLength({ min: 20, max: 500 })
    .withMessage(
      "Description must be at least 100 characters long, and less than 500 characters"
    ),
];
