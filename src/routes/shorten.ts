import express from "express";

import { createShortUrl } from "../controllers/shorten.js";
import { createShortUrlValidator } from "../helpers/validation.js";

const router = express.Router();

router.post("/", createShortUrlValidator(), createShortUrl);

export default router;
