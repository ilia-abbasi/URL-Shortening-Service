import "./helpers/load_env";

import type { Application } from "express";
import { createApp } from "./app/app";

const app: Application = createApp();
const PORT = process.env.PORT || 4000;

app.listen(PORT, (): void => {
  //
});
