import type { Request, Response } from "express";
import type { UserService } from "../services/user.service.js";
import { userSchema } from "../validators/user.validator.js";

export class UserController {
  constructor(private service: UserService) {}

  create = async (req: Request, res: Response) => {
    try {
      const parsed = userSchema.safeParse(req.body);

      if (!parsed.success) {
        return res
          .status(400)
          .json({ errors: parsed.error.flatten().fieldErrors });
      }

      const user = await this.service.create(parsed.data);
      return res.status(201).json(user);
    } catch (err: any) {
      return res
        .status(err.status ?? 500)
        .json({ message: err.message ?? "Erro ao criar usuário" });
    }
  };

  findAll = async (req: Request, res: Response) => {
    try {
      const users = await this.service.findAll();
      return res.status(200).json(users);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro ao buscar usuários" });
    }
  };

  findOne = async (req: Request, res: Response) => {
    try {
      const id = req.params?.id as string;
      const user = await this.service.findOne(id);
      if (!user)
        return res.status(404).json({ message: "Usuário não encontrado" });
      return res.status(200).json(user);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro ao buscar usuário" });
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const parsed = userSchema.safeParse(req.body);

      if (!parsed.success) {
        return res
          .status(400)
          .json({ errors: parsed.error.flatten().fieldErrors });
      }

      const id = req.params?.id as string;
      const user = await this.service.update(id, parsed.data);
      return res.status(200).json(user);
    } catch (err: any) {
      return res
        .status(err.status ?? 500)
        .json({ message: err.message ?? "Erro ao atualizar usuário" });
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      const id = req.params?.id as string;
      await this.service.delete(id);
      return res.status(200).json({ message: "Usuário excluído com sucesso!" });
    } catch (err: any) {
      return res
        .status(err.status ?? 500)
        .json({ message: err.message ?? "Erro ao excluir usuário" });
    }
  };
}
