import { Router } from "express";
import { authController } from "../config/dependencies.js";

const authRoutes = Router();

/**
 * @openapi
 * /login:
 *   post:
 *     tags: [Auth]
 *     summary: Realiza o login
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [password]
 *             properties:
 *               username:
 *                 type: string              
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Credenciais inválidas
 */
authRoutes.post("/login", authController.login);

export default authRoutes;
