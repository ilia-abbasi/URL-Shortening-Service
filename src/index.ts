import "./helpers/load_env.js";

import { Application } from "express-serve-static-core";
import { createApp } from "./app/app.js";
import { customLog } from "./helpers/utils.js";
import { connectDb } from "./database/db.js";

const app: Application = createApp();
const PORT = process.env.PORT || 4000;

connectDb();

app.listen(PORT, (): void => {
  customLog("server", `Listening on port ${PORT} ...`);
});
