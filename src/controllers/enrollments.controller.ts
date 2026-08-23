import type { Request, Response } from "express";
import type { EnrollmentService } from "../services/enrollments.service.js";

export class EnrollmentController {
  constructor(private service: EnrollmentService) {}

  create = async (req: Request, res: Response) => {
    try {
      const enrollment = await this.service.create(req.body);
      return res.status(201).json(enrollment);
    } catch (err: any) {
      return res.status(err.status ?? 500).json({ error: err.message });
    }
  };

  findAll = async (req: Request, res: Response) => {
    try {
      const enrollments = await this.service.findAll();
      return res.status(200).json(enrollments);
    } catch (err: any) {
      return res.status(err.status ?? 500).json({ error: err.message });
    }
  };

  findOne = async (req: Request, res: Response) => {
    try {
      const id = req.params?.id as string;

      const enrollment = await this.service.findOne(id);
      return res.status(200).json(enrollment);
    } catch (err) {
      return res.status(500).json({ error: (err as Error).message });
    }
  };

  cancel = async (req: Request, res: Response) => {
    try {
      const id = req.params?.id as string;

      await this.service.cancel(id);

      return res
        .status(200)
        .json({ message: "Inscrição cancelada com sucesso!" });
    } catch (err) {
      return res.status(500).json({ error: (err as Error).message });
    }
  };
}
