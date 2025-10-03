import express from "express";

import {
  createShortUrl,
  deleteUrl,
  getUrl,
  getUrlStats,
  updateUrl,
} from "../controllers/shorten.js";
import {
  createShortUrlValidator,
  deleteUrlValidator,
  getUrlStatsValidator,
  getUrlValidator,
  updateUrlValidator,
} from "../helpers/validation.js";

const router = express.Router();

// Base route: /shorten

router.post("/", createShortUrlValidator(), createShortUrl);

router.get("/:shortCode", getUrlValidator(), getUrl);
router.put("/:shortCode", updateUrlValidator(), updateUrl);
router.delete("/:shortCode", deleteUrlValidator(), deleteUrl);

router.get("/:shortCode/stats", getUrlStatsValidator(), getUrlStats);

export default router;
