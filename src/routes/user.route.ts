import { Router } from "express";
import { userController } from "../config/dependencies.js";
import { requireAuth } from "../middlewares/require-auth.middleware.js";
import { requireRole } from "../middlewares/role.middleware.js";
import { UserRole } from "../enums/user.enum.js";

const userRoutes = Router();

/**
 * @openapi
 * /users:
 *   post:
 *     tags: [Users]
 *     summary: Criar usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [username, email, password]
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso!
 *       400:
 *         description: Dados inválidos
 */
userRoutes.post("/users", userController.create);
/**
 * @openapi
 * /users:
 *   get:
 *     tags: [Users]
 *     summary: Listar usuários
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuários
 *       401:
 *         description: Não autenticado
 *       403:
 *         description: Acesso negado
 */
userRoutes.get(
  "/users",
  requireAuth,
  requireRole(UserRole.ADMIN),
  userController.findAll,
);
/**
 * @openapi
 * /users/{id}:
 *   get:
 *     tags: [Users]
 *     summary: Buscar usuário por ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Usuário encontrado
 *       401:
 *         description: Não autenticado
 *       403:
 *         description: Acesso negado
 *       404:
 *         description: Usuário não encontrado
 */
userRoutes.get(
  "/users/:id",
  requireAuth,
  requireRole(UserRole.ADMIN),
  userController.findOne,
);
/**
 * @openapi
 * /users/{id}:
 *   put:
 *     tags: [Users]
 *     summary: Atualizar usuário
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuário atualizado
 *       201:
 *         description: Usuário criado com sucesso
 *       400:
 *         description: Credenciais inválidas
 *       401:
 *         description: Não autenticado       
 *       404:
 *         description: Usuário não encontrado
 */
userRoutes.put(
  "/users/:id",
  requireAuth,
  requireRole(UserRole.ADMIN),
  userController.update,
);
/**
 * @openapi
 * /users/{id}:
 *   delete:
 *     tags: [Users]
 *     summary: Deletar usuário
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Usuário excluído com sucesso!
 *       401:
 *         description: Não autenticado        
 *       404:
 *         description: Usuário não encontrado
 */
userRoutes.delete(
  "/users/:id",
  requireAuth,
  requireRole(UserRole.ADMIN),
  userController.delete,
);

export default userRoutes;
