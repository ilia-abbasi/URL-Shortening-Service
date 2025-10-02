import express from "express";

import { createShortUrl } from "../controllers/shorten.js";
import {
  createShortUrlValidator,
  getUrlValidator,
} from "../helpers/validation.js";

const router = express.Router();

router.post("/", createShortUrlValidator(), createShortUrl);

router.get("/:shortCode", getUrlValidator(), getUrlValidator);

export default router;
