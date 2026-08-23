import type {
  CreateEnrollmentInput,
  Enrollment,
} from "../models/enrollment.model.js";
import type { EnrollmentRepository } from "../repository/enrollments.repository.js";
import { EnrollmentEnum } from "../enums/enrollment.enum.js";

export class EnrollmentService {
  constructor(private repository: EnrollmentRepository) {}

  async create(enrollment: CreateEnrollmentInput) {
    const { id, ...safeData } = enrollment as any;

    const enrollments = await this.repository.findAll();
    const existingEnrollment = enrollments.find(
      (item: Enrollment) =>
        item.userId === safeData.userId && item.courseId === safeData.courseId,
    );

    if (existingEnrollment)
      throw new Error("Usuário já possui inscrição neste curso.");

    const newEnrollment = {
      id: crypto.randomUUID(),
      enrolledAt: new Date(),
      status: EnrollmentEnum.ACTIVE,
      ...safeData,
    };

    return await this.repository.create(newEnrollment);
  }

  async findAll() {
    return await this.repository.findAll();
  }

  async findOne(enrollmentId: string) {
    return await this.repository.findOne(enrollmentId);
  }

  async findByUser(userId: string) {
    return await this.repository.findByUser(userId);
  }

  async cancel(enrollmentId: string) {
    const enrollment = await this.repository.findOne(enrollmentId);

    if (!enrollment)
      throw { status: 404, message: "Matrícula não encontrada." };

    if (enrollment.canceledAt) {
      throw {
        status: 409,
        message: "Matrícula já está cancelada.",
      };
    }

    const cancelInfo = {
      ...enrollment,
      status: EnrollmentEnum.CANCELED,
      canceledAt: new Date(),
    };

    return await this.repository.update(enrollmentId, cancelInfo);
  }
}
