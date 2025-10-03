import express from "express";

import { createShortUrl, getUrl, updateUrl } from "../controllers/shorten.js";
import {
  createShortUrlValidator,
  getUrlValidator,
  updateUrlValidator,
} from "../helpers/validation.js";

const router = express.Router();

// Base route: /shorten

router.post("/", createShortUrlValidator(), createShortUrl);

router.get("/:shortCode", getUrlValidator(), getUrl);
router.put("/:shortCode", updateUrlValidator(), updateUrl);

export default router;
