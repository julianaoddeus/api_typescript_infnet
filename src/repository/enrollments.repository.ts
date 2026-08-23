import fs from "node:fs/promises";
import path from "node:path";
import type { Enrollment } from "../models/enrollment.model.js";
import { databasePath } from "../config/database.js";

const filePath = path.resolve(databasePath, "enrollments.json");

export class EnrollmentRepository {
  async findAll(): Promise<Enrollment[]> {
    const enrollments = await fs.readFile(filePath, "utf-8");

    return JSON.parse(enrollments);
  }

  async findOne(enrollmentId: string): Promise<Enrollment> {
    const enrollments = await this.findAll();

    const enrollment = enrollments.find(
      (enrollment: Enrollment) => enrollment.id === enrollmentId,
    );
    if (!enrollment)
      throw { status: 404, message: "Inscrição não encontrada." };

    return enrollment;
  }

  async findByUser(userId: string): Promise<Enrollment[]> {
    const enrollments = await this.findAll();

    return enrollments.filter((e: Enrollment) => e.userId === userId);
  }

  async create(enrollment: Enrollment) {
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
    const enrollment = enrollments[index];

    if (!enrollment)
      throw { status: 404, message: "Inscrição não encontrada." };

    enrollments[index] = {
      ...enrollment,
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
