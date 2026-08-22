import type { Request, Response, NextFunction } from "express";
import fs from "node:fs/promises";
import path from "node:path";

export const logger = (req: Request, res: Response, next: NextFunction) => {
  const filePath = path.resolve("src/database/logger.json");

  const start = Date.now();

  res.on("finish", async () => {
    const duration = Date.now() - start;

    const log = {
      date: new Date().toISOString(),
      method: req.method,
      path: req.path,
      duration: `${duration}ms`,
    };

    try {
      const file = await fs.readFile(filePath, "utf-8");

      const logs = JSON.parse(file);

      logs.push(log);

      await fs.writeFile(filePath, JSON.stringify(logs, null, 2), "utf-8");
    } catch (error) {
      console.error("Erro ao registrar log:", error);
    }
  });

  next();
};
