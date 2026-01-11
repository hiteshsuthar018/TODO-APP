import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {prisma} from "../config/db.js";
import { JWT_SECRET } from "../config/env.js";

// Register a new user
export async function registerUser(name:string,email: string, password: string) {
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    throw new Error("USER_EXISTS");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  
  const user = await prisma.user.create({
    data: {name, email, password: hashedPassword },
  });

  return { id: user.id, email: user.email };
}

// Login an existing user
export async function loginUser(email: string, password: string) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw new Error("INVALID_CREDENTIALS");
  }

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    throw new Error("INVALID_CREDENTIALS");
  }

  const token = jwt.sign(
    { userId: user.id },
    JWT_SECRET!,
    { expiresIn: "7d" }
  );

  return {
    token,
    user: { id: user.id, email: user.email ,name:user.name },
  };
}
