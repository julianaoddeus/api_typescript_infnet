import type {
  CreateEnrollmentInput,
  Enrollment,
} from "../models/enrollment.model.js";
import type { EnrollmentRepository } from "../repository/enrollments.repository.js";
import type { UserRepository } from "../repository/user.repository.js";
import type { CourseRepository } from "../repository/course.repository.js";

export class EnrollmentService {
  constructor(
    private repository: EnrollmentRepository,
    private userRepository: UserRepository,
    private courseRepository: CourseRepository,
  ) {}

  async create(enrollment: CreateEnrollmentInput) {
    const { id, ...safeData } = enrollment as any;

    const user = await this.userRepository.findOne(safeData.userId);
    if (!user) throw { status: 404, message: "Usuário não encontrado." };

    const course = await this.courseRepository.findOne(safeData.courseId);
    if (!course) throw { status: 404, message: "Curso não encontrado." };

    const enrollments = await this.repository.findAll();
    const existingEnrollment = enrollments.find(
      (item: Enrollment) =>
        item.userId === safeData.userId && item.courseId === safeData.courseId,
    );

    if (existingEnrollment)
      throw new Error("Usuário já possui inscrição neste curso.");

    const newEnrollment = {
      id: crypto.randomUUID(),
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

    if (enrollment.cancelledAt) {
      throw {
        status: 409,
        message: "Matrícula já está cancelada.",
      };
    }
    const cancelInfo = {
      ...enrollment,
      canceled: true,
      canceledAt: new Date().toISOString(),
    };

    return await this.repository.update(enrollmentId, cancelInfo);
  }
}
