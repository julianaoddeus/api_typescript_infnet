import express from "express";
import type { Express, Request, Response } from "express";
import userRoutes from "./routes/routes.js";

const app: Express = express();

app.use(express.json());


app.use("/users", userRoutes);

export default app;