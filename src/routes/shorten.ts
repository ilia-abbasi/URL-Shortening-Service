import express from "express";

import { createShortUrl } from "../controllers/shorten.ts";
import { createShortUrlValidator } from "../helpers/validation.ts";

const router = express.Router();

router.post("/", createShortUrlValidator(), createShortUrl);

export default router;
