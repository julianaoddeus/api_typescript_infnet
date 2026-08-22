import type { Course } from "../models/courses.model.js";
import type { CourseRepository } from "../repository/course.repository.js";

export class CourseService {
  constructor(private repository: CourseRepository) {}

  async create(course: Course) {
    return await this.repository.create(course);
  }

  async findAll() {
    return await this.repository.findAll();
  }

  async findOne(courseId: string) {
    return await this.repository.findOne(courseId);
  }
  
  async update(courseId: string, data: Partial<Course>) {
    return await this.repository.update(courseId, data);
  }

  async delete(courseId: string) {
    return await this.repository.delete(courseId);
  }
}
