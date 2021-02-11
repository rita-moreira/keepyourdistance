import { check } from "express-validator";

export const AdminCompleteTaskValidator = [
  check("title").not().isEmpty().withMessage("Title is required"),
  check("description").not().isEmpty().withMessage("Description is required"),
  check("comment").not().isEmpty().withMessage("Comment is required"),
];
