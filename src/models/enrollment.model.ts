export class Enrollment {
  id!: string;
  userId!: string;
  courseId!: string;
  status!: string;
  enrolledAt!: Date;
  cancelledAt!: Date;
}

export type CreateEnrollmentInput = Omit<Enrollment, "id">;
