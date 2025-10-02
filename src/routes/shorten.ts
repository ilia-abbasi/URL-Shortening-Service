import express from "express";

import { createShortUrl, getUrl } from "../controllers/shorten.js";
import {
  createShortUrlValidator,
  getUrlValidator,
} from "../helpers/validation.js";

const router = express.Router();

router.post("/", createShortUrlValidator(), createShortUrl);

router.get("/:shortCode", getUrlValidator(), getUrl);

export default router;
