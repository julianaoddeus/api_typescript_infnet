import type { UserRole } from "../enums/user.enum.js";
import type { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      userId?: string | JwtPayload;
      role?: UserRole;
    }
  }
}
