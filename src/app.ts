import express from "express";
import type { Express } from "express";

import { logger } from "./middlewares/logger.middleware.js";
import swaggerUi from "swagger-ui-express";
import authRoutes from "./routes/login.route.js";
import userRoutes from "./routes/user.route.js";
import courseRoutes from "./routes/course.route.js";
import enrollmentRoutes from "./routes/enrollment.route.js";
import { swaggerSpec } from "./swagger.js";

const app: Express = express();

app.use(express.json());

app.use(logger);

app.use(authRoutes);
app.use(userRoutes);
app.use(courseRoutes);
app.use(enrollmentRoutes);

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default app;
