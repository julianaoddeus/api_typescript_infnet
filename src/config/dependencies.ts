import { AuthController } from "../controllers/auth.controller.js";
import { CourseController } from "../controllers/course.controller.js";
import { EnrollmentController } from "../controllers/enrollments.controller.js";
import { UserController } from "../controllers/user.controller.js";
import { CourseRepository } from "../repository/course.repository.js";
import { EnrollmentRepository } from "../repository/enrollments.repository.js";
import { UserRepository } from "../repository/user.repository.js";
import { CourseService } from "../services/course.service.js";
import { EnrollmentService } from "../services/enrollments.service.js";
import { UserService } from "../services/user.service.js";

const userRepository = new UserRepository();
const userService = new UserService(userRepository);
export const userController = new UserController(userService);

const courseRepository = new CourseRepository();
const courseService = new CourseService(courseRepository);

const enrollmentRepository = new EnrollmentRepository();
const enrollmentService = new EnrollmentService(enrollmentRepository, userRepository, courseRepository);

export const courseController = new CourseController(courseService, enrollmentService);
export const enrollmentController = new EnrollmentController(enrollmentService);

export const authController = new AuthController(userService);
