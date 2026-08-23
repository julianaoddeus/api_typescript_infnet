import z from "zod";
import { EnrollmentEnum } from "../enums/enrollment.enum.js";


export const courseSchema = z.object({
  name: z
    .string({
      error: "Nome do curso é obrigatório.",
    })
    .min(5, {
      error: "Nome deve ter pelo menos 5 caracteres.",
    }),
  description: z
    .string({
      error: "Descrição do curso é obrigatória.",
    })
    .min(10, {
      error: "Descrição deve ter pelo menos 10 caracteres.",
    }),
  startDate: z.coerce.date({
    error: "Data de inicio do curso é obrigatório.",
  }),
  stock: z
    .number({
      error: "Quantidade de vagas é obrigatório.",
    })
    .min(1, {
      error: "Quantidade deve ter pelo menos 1.",
    }),
  imageURL: z.string({
    error: "Imagem para capa do curso é obrigatória.",
  }),
  status: z.enum(EnrollmentEnum).optional(),
});
