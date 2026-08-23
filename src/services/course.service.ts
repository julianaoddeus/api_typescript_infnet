import type { Course, CreateCourseInput } from "../models/courses.model.js";
import type { CourseRepository } from "../repository/course.repository.js";

export class CourseService {
  constructor(private repository: CourseRepository) {}

  async create(course: CreateCourseInput) {
    const { id, ...safeData } = course as any;
    const courses = await this.repository.findAll();
    const courseExists = courses.find((c: any) => c.name === safeData.name);

    if (courseExists) throw { status: 409, message: "Curso já cadastrado." };

    const newCourse = {
      id: crypto.randomUUID(),
      ...safeData,
    };

    return await this.repository.create(newCourse);
  }

  async findAll() {
    return await this.repository.findAll();
  }

  async findOne(courseId: string) {
    return await this.repository.findOne(courseId);
  }

  async update(courseId: string, data: Partial<Course>) {
    const { id, ...safeData } = data as any;

    const exists = await this.repository.findOne(courseId);
    if (!exists) throw { status: 404, message: "Curso não encontrado." };

    return await this.repository.update(courseId, safeData);
  }

  async delete(courseId: string) {
    const exists = await this.repository.findOne(courseId);
    if (!exists) throw { status: 404, message: "Curso não encontrado." };

    return await this.repository.delete(courseId);
  }
}
