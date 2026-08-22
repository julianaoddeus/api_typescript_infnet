import z from "zod";

export const userSchema = z.object({
  username: z
    .string({
      error: "Nome é obrigatório.",
    })
    .min(3, {
      error: "Nome deve ter pelo menos 3 caracteres.",
    }),
  email: z.email({ error: "E-mail inválido!" }),
  password: z
    .string({ error: "Senha é obrigatória." })
    .min(6, { error: "Senha deve ter pelo menos 6 caracteres." }),
});

export const authSchema = z
  .object({
    username: z.string().min(3).optional(),
    email: z.email().optional(),
    password: z.string().min(6),
  })
  .refine((data) => data.username || data.email, {
    message: "Informe o nome ou o email.",
    path: ["username"],
  });
