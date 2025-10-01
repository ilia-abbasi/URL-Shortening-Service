import express from "express";

import { send404Error } from "../helpers/response";

const router = express.Router();

router.use("/shorten");

router.all("/{*anything}", send404Error);

export default router;
