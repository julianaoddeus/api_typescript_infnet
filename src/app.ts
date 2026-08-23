import express from "express";
import type { Express, Request, Response, NextFunction } from "express";
import userRoutes from "./routes/routes.js";
import { logger } from "./middlewares/logger.middleware.js";

const app: Express = express();

app.use(express.json());

app.use((req: Request, res: Response, next: NextFunction) => {
  const mutationMethods = ["POST", "PUT", "PATCH"];
  if (mutationMethods.includes(req.method) && !req.is("application/json")) {
    res.status(415).json({ error: "Content-Type deve ser application/json" });
    return;
  }
  next();
});

app.use(logger);

app.use("/", userRoutes);

export default app;
