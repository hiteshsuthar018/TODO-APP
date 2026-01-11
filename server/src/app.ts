import express from "express";
import cors from "cors";
import morgan from "morgan";

import authRoutes from "./routes/auth.routes.js";
import boardRoutes from "./routes/board.routes.js";
import todoRoutes from "./routes/todo.routes.js";

const app = express();

/**
 * ✅ CORS CONFIG (IMPORTANT)
 * Allow only your frontend domain
 */
app.use(
  cors({
    origin: [
      "https://todo.hitesh.live", // production frontend  
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// ✅ Handle preflight requests (THIS FIXES CORS ERRORS)
app.options("*", cors());

// middlewares
app.use(express.json());
app.use(morgan("dev"));

// health check route
app.get("/health", (_req, res) => {
  res.status(200).json({ status: "OK" });
});

// routes
app.use("/api/auth", authRoutes);
app.use("/api/boards", boardRoutes);
app.use("/api/todos", todoRoutes);

export default app;
