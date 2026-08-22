import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import type { UserService } from "../services/user.service.js";
import { authSchema } from "../validators/user.validator.js";

export class AuthController {
  constructor(private userService: UserService) {}

  login = async (req: Request, res: Response) => {
    try {
      const parsed = authSchema.safeParse(req.body);

      if (!parsed.success) {
        return res
          .status(400)
          .json({ errors: parsed.error.flatten().fieldErrors });
      }

      const { username, email, password } = parsed.data;
      const loginIdentifier = email ?? username;

      if (!loginIdentifier) {
        return res.status(400).json({ message: "Informe nome ou email" });
      }

      const user = await this.userService.findByEmailOrUsername(loginIdentifier);

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
