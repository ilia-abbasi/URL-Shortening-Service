import express from "express";
import type { Application } from "express";
import morgan from "morgan";

export function createApp(): Application {
  const app: Application = express();

  app.use(morgan(":method :url :status - :response-time ms"));
  app.use(express.json());

  return app;
}
