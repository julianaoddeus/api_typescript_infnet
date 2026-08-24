import supertest from "supertest";
import { describe, expect, test } from "@jest/globals";

import express from "express";
import app from "../../app.js";

describe("User API", () => {
  const token = "jwt-token-valido";

  //os testes funcionaram mas para funciona
  // foi preciso passar app abaixo pq da conflito 
  //  SyntaxError: Identifier '__dirname' has already been declared
  // é um  conflito ESM/CommonJS

  // const app = express();

  // app.use(express.json());

  // app.post("/users", (req, res) => {
  //   res.status(201).json({
  //     message: "Usuário criado",
  //   });
  // });

  // app.get("/users", (req, res) => {
  //   res.status(200).json({
  //     id: "1",
  //     username: "teste",
  //   });
  //});

 test("POST/users", async () => {
    const result = await supertest(app)
      .post("/users")
      .auth(token, { type: "bearer" })
      .set("Authorization", `Bearer ${token}`)
      .send({
        username: "",
        email: "",
        password: "",
      });

    expect(result.statusCode).toBe(201);
  });


  test("GET/users - deve listar usuarios", async () => {
    const result = await supertest(app)
      .get("/users")
      .auth(token, { type: "bearer" })
      .set("Authorization", `Bearer ${token}`);

    expect(result.statusCode).toBe(200);
  });
});
