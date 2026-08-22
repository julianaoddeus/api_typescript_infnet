import type { Request, Response } from "express";
import type { UserService } from "../services/user.service.js";

export class UserController {
  constructor(private service: UserService) {}

  create = async (req: Request, res: Response) => {
    const user = await this.service.create(req.body);

    return res.status(201).json(user);
  };

  findAll = async (req: Request, res: Response) => {
    const users = await this.service.findAll();

    return res.status(200).json(users);
  };

  update = async (req: Request, res: Response) => {
    const id = req.params.id as string;    

    const user = await this.service.update(id, req.body);
    
    return res.status(200).json(user);
  };
}
