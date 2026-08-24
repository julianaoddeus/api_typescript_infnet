import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import type { UserRole } from "../enums/user.enum.js";

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
    const payload = jwt.verify(token, secret) as { id: string; role: UserRole };
    req.userId = payload.id;
    req.role = payload.role;
    next();
  } catch {
    return res.status(401).json({ mensagem: "Token inválido ou expirado." });
  }
};
