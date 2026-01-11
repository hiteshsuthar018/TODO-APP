import { User } from "@prisma/client";

declare global {
  namespace Express {
    interface Request {
      user: {
        id: User["id"];
        email?: User["email"];
      };
    }
  }
}

export {};
