import express from "express";
import cors from "cors";
import morgan from "morgan";

import authRoutes from "./routes/auth.routes.js";
import boardRoutes from "./routes/board.routes.js";
import todoRoutes from "./routes/todo.routes.js";
import { errorHandler } from "./middleware/error.middleware.js";

const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// health check route
// app.get("/health", (_req, res) => {
//   res.status(200).json({ status: "OK" });
// });

//routes
app.use("/api/auth", authRoutes);
app.use("/api/boards", boardRoutes);
app.use("/api/todos", todoRoutes);

// error handler middleware
// app.use(errorHandler);

export default app;
