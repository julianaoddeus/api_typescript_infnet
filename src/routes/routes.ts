import { Router } from "express";
import { userController } from "../config/dependencies.js";
import { courseController } from "../config/dependencies.js";

const router = Router();

router.post("/user", userController.create);
router.get("/user", userController.findAll);
router.get("/users/:id", userController.findOne);
router.put("/users/:id", userController.update);
router.delete("/users/:id", userController.delete);

router.post("/courses", courseController.create);
router.get("/courses", courseController.findAll);
router.get("/courses/:id", courseController.findOne);
router.put("/courses/:id", courseController.update);
router.delete("/courses/:id", courseController.delete);

export default router;
