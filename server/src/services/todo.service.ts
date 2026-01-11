import {prisma} from "../config/db.js";

// Create a new todo
export async function createTodo(data: {
  title: string;
  description?: string;
  boardId: string;
}) {
  return prisma.todo.create({ data });
}

// Get todos by board id
export async function getTodosByBoard(boardId: string) {
  return prisma.todo.findMany({
    where: { boardId },
  });
}

// Update an existing todo
export async function updateTodo(
  todoId: string,
  data: {
    title?: string;
    description?: string;
    completed?: boolean;
  }
) {
  const result = await prisma.todo.updateManyAndReturn({
    where: { id: todoId },
    data,
  });
  if (!result) {
    throw new Error("TODO_NOT_FOUND");
  }
  else{
    return result[0];
  }
}

// Delete a todo by id
export async function deleteTodo(todoId: string) {
  await prisma.todo.deleteMany({
    where: { id: todoId },
  });
}
