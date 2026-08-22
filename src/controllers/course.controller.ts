import type { Request, Response } from "express";
import type { CourseService } from "../services/course.service.js";
import {courseSchema } from "../validators/course.validator.js";


export class CourseController {
  constructor(private service: CourseService) {}

  create = async (req: Request, res: Response) => {
    try {
      const parsed = courseSchema.safeParse(req.body);

      if (!parsed.success) {
        return res
          .status(400)
          .json({ errors: parsed.error.flatten().fieldErrors });
      }      

      const course = await this.service.create(parsed.data);
      return res.status(201).json(course);
    } catch (err: any) {
      return res
        .status(err.status ?? 500)
        .json({ message: err.message ?? "Erro ao criar curso" });
    }
  };

  findAll = async (req: Request, res: Response) => {
    try {
      const courses = await this.service.findAll();
      return res.status(200).json(courses);
    } catch (err: any) {
      return res.status(500).json({ message: "Erro ao buscar cursos" });
    }
  };

  findOne = async (req: Request, res: Response) => {
    try {
      const id = req.params?.id as string;
      const course = await this.service.findOne(id);
      if (!course)
        return res.status(404).json({ message: "Curso não encontrado" });
      return res.status(200).json(course);
    } catch (err: any) {
      return res.status(500).json({ message: "Erro ao buscar curso" });
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const parsed = courseSchema.safeParse(req.body);

      if (!parsed.success) {
        return res
          .status(400)
          .json({ errors: parsed.error.flatten().fieldErrors });
      }

      const id = req.params?.id as string;
      const course = await this.service.update(id, parsed.data);
      return res.status(200).json(course);
    } catch (err: any) {
      return res
        .status(err.status ?? 500)
        .json({ message: err.message ?? "Erro ao atualizar curso" });
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      const id = req.params?.id as string;
      await this.service.delete(id);
      return res.status(200).json({ message: "Curso cancelado com sucesso!" });
    } catch (err: any) {
      return res
        .status(err.status ?? 500)
        .json({ message: err.message ?? "Erro ao excluir curso" });
    }
  };
}
