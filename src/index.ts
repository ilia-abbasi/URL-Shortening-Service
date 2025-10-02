import "dotenv/config";

import { Application } from "express-serve-static-core";
import { createApp } from "./app/app.js";
import { customLog } from "./helpers/utils.js";

const app: Application = createApp();
const PORT = process.env.PORT || 4000;

app.listen(PORT, (): void => {
  customLog("server", `Listening on port ${PORT} ...`);
});
