import { Router } from "express";
import { userController } from "../config/dependencies.js";
import { courseController } from "../config/dependencies.js";
import { enrollmentController } from "../config/dependencies.js";
import { authController } from "../config/dependencies.js";
import { requireRole } from "../middlewares/role.middleware.js";
import { requireAuth } from "../middlewares/require-auth.middleware.js";
import { UserRole } from "../enums/user.enum.js";

const router = Router();

router.post("/users", userController.create);
router.get("/users", requireAuth, requireRole(UserRole.ADMIN), userController.findAll);
router.get("/users/:id", requireAuth, requireRole(UserRole.ADMIN), userController.findOne);
router.put("/users/:id", requireAuth, requireRole(UserRole.ADMIN), userController.update);
router.delete("/users/:id", requireAuth, requireRole(UserRole.ADMIN), userController.delete);

router.post("/login", authController.login);

router.post("/courses", requireAuth, requireRole(UserRole.ADMIN), courseController.create);
router.get("/courses", requireAuth, courseController.findAll);
router.get("/courses/:id", requireAuth, courseController.findOne);
router.get("/courses/enrollments/:userId", requireAuth, courseController.findCourseWithEnrollment);
router.put("/courses/:id", requireAuth, requireRole(UserRole.ADMIN), courseController.update);
router.delete("/courses/:id", requireAuth, requireRole(UserRole.ADMIN), courseController.delete);

router.post("/enrollments", requireAuth, enrollmentController.create);
router.patch("/enrollments/:id", requireAuth, enrollmentController.cancel);

export default router;
