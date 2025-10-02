import "dotenv/config";

import type { Application } from "express";
import { createApp } from "./app/app.ts";
import { customLog } from "./helpers/utils.ts";

const app: Application = createApp();
const PORT = process.env.PORT || 4000;

app.listen(PORT, (): void => {
  customLog("server", `Listening on port ${PORT} ...`);
});
