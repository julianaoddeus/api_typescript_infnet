import fs from "node:fs/promises";
import path from "node:path";
import type { Course } from "../models/courses.model.js";

const filePath = path.resolve("src/database/courses.json");

export class CourseRepository {
  async findAll() {
    const data = await fs.readFile(filePath, "utf-8");

    return JSON.parse(data);
  }

  async findOne(courseId: string) {
    const courses = await this.findAll();
    return courses.find((course: Course) => course.id === courseId);
  }

  async create(course: object) {
    const courses = await this.findAll();

    courses.push(course);

    await fs.writeFile(filePath, JSON.stringify(courses, null, 2), "utf-8");

    return course;
  }

  async update(courseId: string, data: Partial<Course>) {
    const courses = await this.findAll();
    const index = courses.findIndex((course: Course) => course.id === courseId);

    courses[index] = {
      ...courses[index],
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
