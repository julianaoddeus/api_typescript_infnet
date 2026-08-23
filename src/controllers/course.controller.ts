import type { Request, Response } from "express";
import type { CourseService } from "../services/course.service.js";
import { courseSchema } from "../validators/course.validator.js";
import type { EnrollmentService } from "../services/enrollments.service.js";

export class CourseController {
  constructor(
    private service: CourseService,
    private enrollmentService: EnrollmentService,
  ) {}

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

  findCourseWithEnrollment = async (req: Request, res: Response) => {
    try {
      const userId = req.params?.userId as string;

      if (!userId)
        return res.status(400).json({ message: "Usuário não informado" });

      const courses = await this.service.findAll();
      const enrollments = await this.enrollmentService.findByUser(userId);

      const coursesWithEnrollments = enrollments.map((enrollment) => {
        const course = courses.find(
          (course) => course.id == enrollment.courseId,
        );

        if (!course) return null;

        return {
          ...course,
          status: enrollment.status,
          enrolledAt: enrollment.enrolledAt,
          canceledAt: enrollment.canceledAt,
        };
      });

      return res.status(200).json(coursesWithEnrollments);
    } catch (err: any) {
      return res.status(500).json({ message: "Erro ao buscar cursos" });
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
      const { status, ...data } = parsed.data;

      const course = await this.service.update(id, data);
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
