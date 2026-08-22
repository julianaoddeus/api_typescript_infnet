import express from "express";
import type { Express } from "express";
import userRoutes from "./routes/routes.js";

const app: Express = express();

app.use(express.json());

app.use("/", userRoutes);

export default app;
