import { config } from "dotenv";
import { z } from "zod";

config(); 

const envSchema = z.object({

  PORT: z.string(),
  DATABASE_URL: z.string().min(1),
  JWT_SECRET: z.string().min(10),
});

const envVars = {
  PORT: process.env.PORT,
  DATABASE_URL: process.env.DATABASE_URL,
  JWT_SECRET: process.env.JWT_SECRET,
};

const parsed = envSchema.safeParse(envVars);

if (!parsed.success) {
  process.exit(1);
}

export const PORT = parsed.data.PORT;
export const DATABASE_URL = parsed.data.DATABASE_URL;
export const JWT_SECRET = parsed.data.JWT_SECRET;
