import type { NextFunction, Request, Response } from "express";
import { UserRole } from "../enums/user.enum.js";
import jwt from "jsonwebtoken";

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader: string | undefined = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    res.status(401).json({ error: "Token não fornecido." });
    return;
  }

  const token = authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ mensagem: "Não autorizado" });
  const secret = process.env.JWT_SECRET;

  if (!secret) throw new Error("token não configurado.");

  try {
    req.userId = jwt.verify(token, secret);
    req.role = UserRole.ADMIN;
    next();
  } catch {
    return res.status(403).json({ mensagem: "Token inválido" });
  }
};
