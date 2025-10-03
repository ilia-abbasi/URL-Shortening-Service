import express from "express";

import shortenRouter from "./shorten.js";
import redirectRouter from "./redirect.js";
import { send404Error } from "../helpers/response.js";

const router = express.Router();

router.use("/shorten", shortenRouter);
router.use("/", redirectRouter);

router.all("/{*anything}", send404Error);

export default router;
