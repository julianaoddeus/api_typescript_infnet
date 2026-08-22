import fs from "node:fs/promises";
import path from "node:path";
import type { Enrollment } from "../models/enrollment.model.js";

const filePath = path.resolve("src/database/enrollments.json");

export class EnrollmentRepository {
  async findAll() {
    const data = await fs.readFile(filePath, "utf-8");

    return JSON.parse(data);
  }

  async findOne(enrollmentId: string) {
    const enrollments = await this.findAll();

    return enrollments.find(
      (enrollment: Enrollment) => enrollment.id === enrollmentId,
    );
  }

  async findByUser(userId: string) {
    const enrollments = await this.findAll();
    return enrollments.filter((e: Enrollment) => e.userId === userId);
  }

  async create(enrollment: object) {
    const enrollments = await this.findAll();

    enrollments.push(enrollment);

    await fs.writeFile(filePath, JSON.stringify(enrollments, null, 2), "utf-8");

    return enrollment;
  }

  async update(enrollmentId: string, data: Partial<Enrollment>) {
    const enrollments = await this.findAll();

    const index = enrollments.findIndex(
      (enrollment: any) => enrollment.id === enrollmentId,
    );

    enrollments[index] = {
      ...enrollments[index],
      ...data,
    };

    await fs.writeFile(filePath, JSON.stringify(enrollments, null, 2), "utf-8");

    return enrollments[index];
  }

  async cancel(enrollmentId: string) {
    const enrollments = await this.findAll();

    const filteredEnrollments = enrollments.filter(
      (enrollment: any) => enrollment.id !== enrollmentId,
    );

    await fs.writeFile(
      filePath,
      JSON.stringify(filteredEnrollments, null, 2),
      "utf-8",
    );
  }
}
