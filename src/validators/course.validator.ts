import z from "zod";

export const courseSchema = z.object({
  name: z.string().min(10),
  description: z.string().min(3),
  startDate: z.coerce.date(),
  stock: z.number().min(1),
  imageURL: z.string(),
});
