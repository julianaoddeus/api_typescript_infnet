import z from "zod";

export const creatUserSchema = z.object({
  id: z.string(),
  username: z.string().min(3),
  email: z.email(),
  password: z.string().min(6),
  role: z.enum(["ADMIN", "READER"]),
});
