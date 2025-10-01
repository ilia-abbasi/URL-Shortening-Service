import "./helpers/load_env";

import type { Application } from "express";
import { createApp } from "./app/app";
import { customLog } from "./helpers/utils";

const app: Application = createApp();
const PORT = process.env.PORT || 4000;

app.listen(PORT, (): void => {
  customLog("server", `Listening on port ${PORT} ...`);
});
