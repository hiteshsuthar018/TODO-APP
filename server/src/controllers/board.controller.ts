import { Request, Response } from "express";
import {
  createBoardSchema,
  updateBoardSchema,
} from "../validations/board.schema.js";
import * as boardService from "../services/board.service.js";

// Creating a new board
export async function createBoard(req: Request, res: Response) {
  const parsed = createBoardSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ message: "Invalid input" });
  }

  const board = await boardService.createBoard(
    req.user.id,
    parsed.data.title
  );

  res.status(201).json(
    {
        message: "Board created successfully",
        board
    }
  );
}
// getting all boards for a user
export async function getBoards(req: Request, res: Response) {
  const boards = await boardService.getBoards(req.user.id);
  res.json(
    {
        message: "Boards fetched successfully",
        boards
    }
  );
}
// getting a board by id
export async function getBoardById(req: Request, res: Response) {
  const board = await boardService.getBoardById(
    req.user.id,
    req.params.id
  );

  if (!board) {
    return res.status(404).json({ message: "Board not found" });
  }

  res.json(
    {
        message: "Board fetched successfully",
        board
    }
  );
}

// updating an existing board
export async function updateBoard(req: Request, res: Response) {
  const parsed = updateBoardSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ message: "Invalid input" });
  }

  try {
    const board = await boardService.updateBoard(
      req.user.id,
      req.params.id,
      parsed.data
    );
    res.json({ message: "Board updated", board });
  } catch (error: any) {
    if (error.message === "BOARD_NOT_FOUND") {
      return res.status(404).json({ message: "Board not found" });
    }
    throw error;
  }
}

// deleting a board by id
export async function deleteBoard(req: Request, res: Response) {
  await boardService.deleteBoard(req.user.id, req.params.id);
  res.status(204).json({message:"Board deleted" });
}
