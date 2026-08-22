import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import type { UserService } from "../services/user.service.js";
import { creatUserSchema } from "../validators/user.validator.js";

export class AuthController {
  constructor(private userService: UserService) {}

  login = async (req: Request, res: Response) => {
    try {
      const parsed = creatUserSchema.safeParse(req.body);

      if (!parsed) return res.status(400).json({ message: "Dados inválidos" });

      if (!parsed.data?.email)
        return res.status(400).json({ message: "E-mail é obrigatório" });

      if (!parsed.data?.password)
        return res.status(400).json({ message: "Senha é obrigatório" });

      const { username, email, password } = req.body;

      const user = await this.userService.findByEmailOrUsername(
        email ?? username,
      );

      if (!user)
        return res.status(401).json({ message: "Credenciais inválidas" });

      const valid = await bcrypt.compare(password, user.password);

      if (!valid)
        return res.status(401).json({ message: "Credenciais inválidas" });

      const secret = process.env.JWT_SECRET;

      if (!secret) {
        throw new Error("JWT_SECRET não configurado");
      }

      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
          username: user.username,
          role: user.role,
        },
        secret,
        {
          expiresIn: "1d",
        },
      );

      res.json({
        token,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
        },
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erro no servidor" });
    }
  };
}
