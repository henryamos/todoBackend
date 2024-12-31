
import { body, validationResult } from "express-validator";

export const validateTodo = [
  body("title")
    .isLength({ min: 3 })
    .withMessage("Title must be at least 3 characters long"),
  body("description")
    .isLength({ min: 5 })
    .withMessage("Description must be at least 5 characters long"),
  body("dueDate")
    .isISO8601()
    .toDate()
    .withMessage("Due date must be a valid date"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

