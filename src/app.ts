import express from "express";
import type { Express } from "express";
import userRoutes from "./routes/routes.js";
import { logger } from "./middlewares/logger.middleware.js";

const app: Express = express();

app.use(express.json());

app.use(logger);

app.use("/", userRoutes);

export default app;
