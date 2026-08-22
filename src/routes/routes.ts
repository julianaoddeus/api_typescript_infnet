import { Router } from "express";
import { userController } from "../config/dependencies.js";
import { courseController } from "../config/dependencies.js";
import { enrollmentController } from "../config/dependencies.js";
import { authController } from "../config/dependencies.js";
import { requireAuth } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/users", userController.create);
router.get(
  "/users/:id/enrollments",
  requireAuth,
  enrollmentController.findByUser,
);
router.get("/users", userController.findAll);
router.get("/users/:id", userController.findOne);
router.put("/users/:id", userController.update);    
router.delete("/users/:id", userController.delete); 

router.post("/auth/login", authController.login);

router.post("/courses", courseController.create);
router.get("/courses", courseController.findAll);
router.get("/courses/:id", courseController.findOne);
router.put("/courses/:id", courseController.update);
router.delete("/courses/:id", courseController.delete);

router.post("/enrollments", requireAuth, enrollmentController.create);
router.get("/enrollments", requireAuth, enrollmentController.findAll);
router.get("/enrollments/:id", requireAuth, enrollmentController.findOne);
router.put("/enrollments/:id", requireAuth, enrollmentController.update);
router.delete("/enrollments/:id", requireAuth, enrollmentController.delete);

export default router;
