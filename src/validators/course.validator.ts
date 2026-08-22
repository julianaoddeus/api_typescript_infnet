import z from "zod";

export const courseSchema = z.object({
  name: z
    .string({
      error: "Nome é obrigatório.",
    })
    .min(10, {
      error: "Nome deve ter pelo menos 10 caracteres.",
    }),
  description: z
    .string({
      error: "Descrição é obrigatória.",
    })
    .min(3, {
      error: "Descrição deve ter pelo menos 3 caracteres.",
    }),
  startDate: z.coerce.date({
    error: "Data é obrigatório.",
  }),
  stock: z
    .number({
      error: "Quantidade é obrigatório.",
    })
    .min(1, {
      error: "Quantidade deve ter pelo menos 1.",
    }),
  imageURL: z.string().optional(),
});
