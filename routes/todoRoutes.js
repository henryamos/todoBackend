
import { createTodo, deleteTodo, getTodoById, getTodos, updateTodo } from "../controllers/todoController.js";
import { Router } from "express";
import { validateTodo } from "../validations/todoValidation.js";
const router = Router();

router.get("/",getTodos);
router.get("/:id", getTodoById);
router.post("/", validateTodo, createTodo);
router.delete("/:id", deleteTodo);
router.patch("/:id", validateTodo,updateTodo);

export default router;
