import type { Request, Response } from "express";
import type { CourseService } from "../services/course.service.js";

export class CourseController {
  constructor(private service: CourseService) {}

  create = async (req: Request, res: Response) => {
    const course = await this.service.create(req.body);

    return res.status(201).json(course);
  };

  findAll = async (req: Request, res: Response) => {
    const courses = await this.service.findAll();

    return res.status(200).json(courses);
  };

  findOne = async (req: Request, res: Response) => {
    const id = req.params.id as string;

    const course = await this.service.findOne(id);

    return res.status(200).json(course);
  };

  update = async (req: Request, res: Response) => {
    const id = req.params.id as string;

    const course = await this.service.update(id, req.body);

    return res.status(200).json(course);
  };

  delete = async (req: Request, res: Response) => {
    const id = req.params.id as string;

    await this.service.delete(id);

    return res.status(200).json({ message: "Curso cancelado com sucesso!" });
  };
}
