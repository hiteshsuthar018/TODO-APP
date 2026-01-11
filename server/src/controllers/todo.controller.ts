import { Request, Response } from "express";
import {
  createTodoSchema,
  updateTodoSchema,
} from "../validations/todo.schema.js";
import * as todoService from "../services/todo.service.js";

// Creating a new todo
export async function createTodo(req: Request, res: Response) {
  const parsed = createTodoSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ message: "Invalid input" });
  }
  // Calling the service to create the todo
  const todo = await todoService.createTodo(parsed.data);
  res.status(201).json(
    {
        message: "Todo created successfully",
        todo
    }
  );
}

// Get todos by board ID
export async function getTodosByBoard(req: Request, res: Response) {
  // Calling the service to get todos for the specified board
  const todos = await todoService.getTodosByBoard(req.params.boardId);
  res.json({
    message: "Todos fetched successfully",
    todos
  });
}
// updating an existing todo
export async function updateTodo(req: Request, res: Response) {
  const parsed = updateTodoSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ message: "Invalid input" });
  }

  try {
    const todo = await todoService.updateTodo(req.params.id, parsed.data);
    res.json({ message: "Todo updated", todo });
  } catch (error: any) {
    if (error.message === "TODO_NOT_FOUND") {
      return res.status(404).json({ message: "Todo not found" });
    }
    throw error;
  }
}
// deleting a todo by id
export async function deleteTodo(req: Request, res: Response) {
  await todoService.deleteTodo(req.params.id);
  res.status(204).json({
    message:" Todo deleted",
  });
}
