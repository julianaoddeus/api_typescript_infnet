import { Router } from "express";
import { userController } from "../config/dependencies.js";

const router = Router();

router.post("/", userController.create);
router.get("/", userController.findAll);
router.put("/", userController.update);

export default router;
