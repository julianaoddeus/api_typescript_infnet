import { Router } from "express";
import { requireAuth } from "../middlewares/require-auth.middleware.js";
import { courseController } from "../config/dependencies.js";
import { requireRole } from "../middlewares/role.middleware.js";
import { UserRole } from "../enums/user.enum.js";

const courseRoutes = Router();

/**
 * @openapi
 * /courses:
 *   post:
 *     tags: [Courses]
 *     summary: Criar curso
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, description, startDate, stock, imageURL]
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               startDate:
 *                 type: string
 *                 format: date
 *               stock:
 *                 type: number
 *               imageURL:
 *                 type: string
 *     responses:
 *       201:
 *         description: Curso criado
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Não autenticado
 *       403:
 *         description: Acesso negado
 */
courseRoutes.post(
  "/courses",
  requireAuth,
  requireRole(UserRole.ADMIN),
  courseController.create,
);

/**
 * @openapi
 * /courses:
 *   get:
 *     tags: [Courses]
 *     summary: Listar cursos
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de cursos
 *       401:
 *         description: Não autenticado
 */
courseRoutes.get("/courses", requireAuth, courseController.findAll);
/**
 * @openapi
 * /courses/{id}:
 *   get:
 *     tags: [Courses]
 *     summary: Buscar curso por ID
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
 *         description: Curso encontrado
 *       401:
 *         description: Não autenticado
 *       404:
 *         description: Curso não encontrado
 */

courseRoutes.get("/courses/:id", requireAuth, courseController.findOne);
/**
 * @openapi
 * /courses/enrollments/{userId}:
 *   get:
 *     tags: [Courses]
 *     summary: Listar cursos com matrícula do usuário
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de cursos com status de matrícula
 *       401:
 *         description: Não autenticado
 *       404:
 *         description: Usuário não encontrado
 */
courseRoutes.get(
  "/courses/enrollments/:userId",
  requireAuth,
  courseController.findCourseWithEnrollment,
);


/**
 * @openapi
 * /courses/{id}:
 *   put:
 *     tags: [Courses]
 *     summary: Atualizar curso
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
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               startDate:
 *                 type: string
 *                 format: date
 *               stock:
 *                 type: number
 *               imageURL:
 *                 type: string
 *     responses:
 *       200:
 *         description: Curso atualizado
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Não autenticado
 *       403:
 *         description: Acesso negado
 *       404:
 *         description: Curso não encontrado
 */
courseRoutes.put(
  "/courses/:id",
  requireAuth,
  requireRole(UserRole.ADMIN),
  courseController.update,
);

/**
 * @openapi
 * /courses/{id}:
 *   delete:
 *     tags: [Courses]
 *     summary: Deletar curso
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
 *         description: Curso deletado
 *       401:
 *         description: Não autenticado
 *       403:
 *         description: Usuário não autorizado.
 *       404:
 *         description: Curso não encontrado
 */
courseRoutes.delete(
  "/courses/:id",
  requireAuth,
  requireRole(UserRole.ADMIN),
  courseController.delete,
);

export default courseRoutes;
