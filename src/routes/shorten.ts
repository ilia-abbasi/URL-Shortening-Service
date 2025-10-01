import express from "express";

import { createShortUrl } from "../controllers/shorten";
import { createShortUrlValidator } from "../helpers/validation";

const router = express.Router();

router.post("/", createShortUrlValidator(), createShortUrl);

export default router;
