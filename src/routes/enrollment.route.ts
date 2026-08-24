import { Router } from "express";
import { requireAuth } from "../middlewares/require-auth.middleware.js";
import { enrollmentController } from "../config/dependencies.js";

const enrollmentRoutes = Router();

/**
 * @openapi
 * /enrollments:
 *   post:
 *     tags: [Enrollments]
 *     summary: Criar matrícula
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [userId, courseId]
 *             properties:
 *               userId:
 *                 type: string
 *               courseId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Matrícula criada
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Não autenticado
 *       404:
 *         description: Usuário ou curso não encontrado
 */

enrollmentRoutes.post("/enrollments", requireAuth, enrollmentController.create);

/**
 * @openapi
 * /enrollments/{id}:
 *   patch:
 *     tags: [Enrollments]
 *     summary: Cancelar matrícula
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
 *         description: Matrícula cancelada
 *       401:
 *         description: Não autenticado
 *       404:
 *         description: Matrícula não encontrada
 */
enrollmentRoutes.patch(
  "/enrollments/:id",
  requireAuth,
  enrollmentController.cancel,
);

export default enrollmentRoutes;
