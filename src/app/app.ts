import express from "express";
import { Application } from "express-serve-static-core";
import morgan from "morgan";

import mainRouter from "../routes/main.js";
import { generalErrorHandler } from "../helpers/response.js";

export function createApp(): Application {
  const app: Application = express();

  app.use(morgan(":method :url :status - :response-time ms"));
  app.use(express.json());

  app.use(mainRouter);

  app.use(generalErrorHandler);

  return app;
}
