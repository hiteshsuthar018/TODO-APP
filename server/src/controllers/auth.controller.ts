import { Request, Response } from "express";
import { registerSchema, loginSchema } from "../validations/auth.schema.js";
import { registerUser, loginUser } from "../services/auth.service.js";
import { success } from "zod";

export async function register(req: Request, res: Response) {
  const parsed = registerSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ message: "Invalid input" });
  }

  try {
    const user = await registerUser(
      parsed.data.name,  
      parsed.data.email,
      parsed.data.password
    );

    res.status(201).json({
      message: "User registered successfully",
      success:true,
      user,
    });
  } catch (error: any) {
    if (error.message === "USER_EXISTS") {
      return res.status(409).json({ message: "User already exists" });
    }
    throw error;
  }
}

export async function login(req: Request, res: Response) {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ message: "Invalid input" });
  }

  try {
    const result = await loginUser(
      parsed.data.email,
      parsed.data.password
    );

    res.json(
        {
            message: "Login successful",
            token:result.token,
            user:result.user,
            success:true,
        }
    );
  } catch (error: any) {
    if (error.message === "INVALID_CREDENTIALS") {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    throw error;
  }
}
