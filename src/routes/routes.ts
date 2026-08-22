import { Router } from "express";
import { userController } from "../config/dependencies.js";
import { courseController } from "../config/dependencies.js";
import { enrollmentController } from "../config/dependencies.js";
import { authController } from "../config/dependencies.js";
import { requireRole } from "../middlewares/role.middleware.js";
import { requireAuth } from "../middlewares/auth.middleware.js";
import { UserRole } from "../enums/user.enum.js";

const router = Router();

router.post("/users", userController.create);
router.get(
  "/users/:id/enrollments",
  requireAuth,
  enrollmentController.findByUser,
);
router.get("/users", requireAuth, userController.findAll);
router.get("/users/:id", requireAuth, userController.findOne);
router.put("/users/:id", requireAuth, userController.update);
router.delete("/users/:id", requireAuth, userController.delete);

router.post("/auth/login", authController.login);

router.post(
  "/courses",
  requireAuth,
  requireRole(UserRole.ADMIN),
  courseController.create,
);
router.get("/courses", requireAuth, courseController.findAll);
router.get("/courses/:id", requireAuth, courseController.findOne);
router.put(
  "/courses/:id",
  requireAuth,
  requireRole(UserRole.ADMIN),
  courseController.update,
);
router.delete(
  "/courses/:id",
  requireAuth,
  requireRole(UserRole.ADMIN),
  courseController.delete,
);

router.post("/enrollments", requireAuth, enrollmentController.create);
router.get("/enrollments", requireAuth, enrollmentController.findAll);
router.get("/enrollments/:id", requireAuth, enrollmentController.findOne);
router.put("/enrollments/:id", requireAuth, enrollmentController.update);
router.delete("/enrollments/:id", requireAuth, enrollmentController.delete);

export default router;
