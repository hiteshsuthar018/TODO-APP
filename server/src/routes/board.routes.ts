import { Router } from "express";
import {
  createBoard,
  getBoards,
  getBoardById,
  updateBoard,
  deleteBoard,
} from "../controllers/board.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";

const router = Router();

// Protect all routes below with JWT authentication middleware
router.use(authenticate);

// Routes for creating and managing user boards

// create a new board
router.post("/", createBoard);
// get all boards for the authenticated user
router.get("/", getBoards);
// get a specific board by id
router.get("/:id", getBoardById);
// update a board by id
router.put("/:id", updateBoard);
// delete a board by id
router.delete("/:id", deleteBoard);

export default router;
