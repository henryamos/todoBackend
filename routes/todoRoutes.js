import {
  createTodo,
  deleteTodo,
  getTodoById,
  getTodos,
  updateTodo,
} from "../controllers/todoController.js";
import { Router } from "express";
import {
  validateCreateTodo,
  validateUpdateTodo,
} from "../validations/todoValidation.js";

const router = Router();

router.get("/", getTodos);
router.get("/:id", getTodoById);
router.post("/", validateCreateTodo, createTodo);
router.patch("/:id", validateUpdateTodo, updateTodo);
router.delete("/:id", deleteTodo);

export default router;
