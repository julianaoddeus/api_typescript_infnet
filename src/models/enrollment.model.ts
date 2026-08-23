import type { EnrollmentEnum } from "../enums/enrollment.enum.js";

export class Enrollment {
  id!: string;
  userId!: string;
  courseId!: string;
  status!: EnrollmentEnum;
  enrolledAt!: Date;
  cancelledAt!: Date;
}

export type CreateEnrollmentInput = Omit<Enrollment, "id">;
