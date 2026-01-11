import { z } from "zod";

export const createTodoSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  boardId: z.string(),
});

export const updateTodoSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  completed: z.boolean().optional(),
});
