import { describe, expect, test } from "@jest/globals";
import { userSchema } from "../../../src/validators/user.validator";

describe("Canary Test", () => {
  test("Deve validar usuário com dados corretos", () => {
    const result = userSchema.safeParse({
      username: "juliana",
      email: "juliana@example.com",
      password: "senha123",
    });

    expect(result.success).toBe(true);
  });

  test("Deve retornar email inválido", () => {
    const result = userSchema.safeParse({
      username: "juliana",
      email: "juliana2example.com",
      password: "senha123",
    });
    expect(result.success).toBe(false);
  });

  test("Deve retornar username com menos de 3 caracteres", () => {
    const result = userSchema.safeParse({
      username: "ju",
      email: "juliana2example.com",
      password: "senha123",
    });
    expect(result.success).toBe(false);
  });

   test("Deve retornar senha com menos de 6 caracteres", () => {
    const result = userSchema.safeParse({
      username: "juliana",
      email: "juliana2example.com",
      password: "senha",
    });
    expect(result.success).toBe(false);
  });
});
