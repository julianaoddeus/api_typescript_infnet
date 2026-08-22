import type { CreateEnrollmentInput, Enrollment } from "../models/enrollment.model.js";
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
    const user = await this.userRepository.findOne(userId);
    if (!user) throw { status: 404, message: "Usuário não encontrado." };
    return await this.repository.findByUser(userId);
  }

  async update(enrollmentId: string, data: Partial<Enrollment>) {
    const { id, ...safeData } = data as any;
    const exists = await this.repository.findOne(enrollmentId);
    if (!exists) throw { status: 404, message: "Matrícula não encontrada." };
    return await this.repository.update(enrollmentId, safeData);
  }

  async delete(enrollmentId: string) {
    const exists = await this.repository.findOne(enrollmentId);
    if (!exists) throw { status: 404, message: "Matrícula não encontrada." };
    return await this.repository.delete(enrollmentId);
  }
}
