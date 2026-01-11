import { Router } from "express";
import {
  register,
  login,
} from "../controllers/auth.controller.js";

const router = Router();

// Routes related to user authentication (login & register)
router.post("/register", register);
router.post("/login", login);

export default router;
