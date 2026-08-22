import type { Request, Response } from "express";
import type { UserService } from "../services/user.service.js";
import { creatUserSchema } from "../validators/user.validator.js";

export class UserController {
  constructor(private service: UserService) {}

  create = async (req: Request, res: Response) => {
    try {
      const parsed = creatUserSchema.safeParse(req.body);

      if (!parsed.data?.username)
        return res.status(400).json({ message: "Nome é obrigatório" });

      if (!parsed.data?.email)
        return res.status(400).json({ message: "E-mail é obrigatório" });

      if (!parsed.data?.password)
        return res.status(400).json({ message: "Senha é obrigatório" });

      const user = await this.service.create(req.body);
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
      const parsed = creatUserSchema.safeParse(req.body);

      if (!parsed.data?.username)
        return res.status(400).json({ message: "Nome é obrigatório" });

      if (!parsed.data?.email)
        return res.status(400).json({ message: "E-mail é obrigatório" });

      if (!parsed.data?.password)
        return res.status(400).json({ message: "Senha é obrigatório" });

      const id = req.params?.id as string;
      const user = await this.service.update(id, req.body);
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
