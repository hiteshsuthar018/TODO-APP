import { Router } from "express";
import {
  createTodo,
  getTodosByBoard,
  updateTodo,
  deleteTodo,
} from "../controllers/todo.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";

const router = Router();

//middleware to authenticate all todo routes
router.use(authenticate);

// Routes for handling todos inside boards

// create a new todo
router.post("/", createTodo);
// get todos by board id
router.get("/board/:boardId", getTodosByBoard);
// update a todo by id
router.put("/:id", updateTodo);
// delete a todo by id
router.delete("/:id", deleteTodo);

export default router;
