export class Course {
  id!: string;
  name!: string;
  description!: string;
  startDate!: string;
  stock!: number;
  imageURL!: string;
}

export type CreateCourseInput = Omit<Course, "id">;
