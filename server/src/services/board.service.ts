import {prisma} from "../config/db.js";

// Create a new board
export async function createBoard(userId: string, title: string) {
  return prisma.board.create({
    data: { title, userId },
  });
}

// Get all boards for a user
export async function getBoards(userId: string) {
  return prisma.board.findMany({
    where: { userId },
    include: { todos: true },
  });
}

// Get a board by id for a user
export async function getBoardById(userId: string, boardId: string) {
  return prisma.board.findFirst({
    where: { id: boardId, userId },
  });
}

// Update a board by id for a user
export async function updateBoard(
  userId: string,
  boardId: string,
  data: { title?: string }
) {
  const result = await prisma.board.updateManyAndReturn({
    where: { id: boardId, userId },
    data,
  });

  if (!result) {
    throw new Error("BOARD_NOT_FOUND");
  }
  return result[0];
}

// Delete a board by id for a user
export async function deleteBoard(userId: string, boardId: string) {
  await prisma.board.deleteMany({
    where: { id: boardId, userId },
  });
}
