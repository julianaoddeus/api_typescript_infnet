import fs from "node:fs/promises";
import path from "node:path";
import type { Course } from "../models/courses.model.js";
import { databasePath } from "../config/database.js";

const filePath = path.resolve(databasePath, "courses.json");

export class CourseRepository {
  async findAll(): Promise<Course[]> {
    const courses = await fs.readFile(filePath, "utf-8");

    return JSON.parse(courses);
  }

  async findOne(courseId: string): Promise<Course> {
    const courses = await this.findAll();
    const course = courses.find((course: Course) => course.id === courseId);

    if (!course) throw { status: 404, message: "Curso não encontrado." };

    return course;
  }

  async findCourseWithEnrollment(): Promise<Course> {
    const courses = await fs.readFile(filePath, "utf-8");

    return JSON.parse(courses);
  }

  async create(course: Course): Promise<Course> {
    const courses = await this.findAll();

    courses.push(course);

    await fs.writeFile(filePath, JSON.stringify(courses, null, 2), "utf-8");

    return course;
  }

  async update(courseId: string, data: Partial<Course>) {
    const courses = await this.findAll();
    const index = courses.findIndex((course: Course) => course.id === courseId);
    const course = courses[index];

    if (!course) throw { status: 404, message: "Curso não encontrado." };

    courses[index] = {
      ...course,
      ...data,
    };

    await fs.writeFile(filePath, JSON.stringify(courses, null, 2), "utf-8");

    return courses[index];
  }

  async delete(courseId: string) {
    const courses = await this.findAll();

    const filteredCourses = courses.filter(
      (course: any) => course.id !== courseId,
    );

    await fs.writeFile(
      filePath,
      JSON.stringify(filteredCourses, null, 2),
      "utf-8",
    );
  }
}
