import express from "express";

import shortenRouter from "./shorten";
import { send404Error } from "../helpers/response";

const router = express.Router();

router.use("/shorten", shortenRouter);

router.all("/{*anything}", send404Error);

export default router;
