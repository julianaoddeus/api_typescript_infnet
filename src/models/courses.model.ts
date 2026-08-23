export class Course {
  id!: string;
  name!: string;
  description!: string;
  startDate!: Date;
  stock!: number;
  imageURL?: string | null;
}

export type CreateCourseInput = Omit<Course, "id">;
