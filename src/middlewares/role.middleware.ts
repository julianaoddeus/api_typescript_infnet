import type { NextFunction, Request, Response } from "express";
import type { UserRole } from "../enums/user.enum.js";

export const requireRole = (...alowedRoles: UserRole[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.role) {
      return res.status(401).json({ message: "usuário não autenticado." });
    }

    if (!alowedRoles.includes(req.role)) {
      return res.status(403).json({ message: "usuário não autorizado." });
    }

    next();
  };
};
