import { CourseController } from "../controllers/course.controller.js";
import { UserController } from "../controllers/user.controller.js";
import { CourseRepository } from "../repository/course.repository.js";
import { UserRepository } from "../repository/user.repository.js";
import { CourseService } from "../services/course.service.js";
import { UserService } from "../services/user.service.js";

const userRepository = new UserRepository();
const userService = new UserService(userRepository);
export const userController = new UserController(userService);

const courseRepository = new CourseRepository();
const courseService = new CourseService(courseRepository);
export const courseController = new CourseController(courseService);
