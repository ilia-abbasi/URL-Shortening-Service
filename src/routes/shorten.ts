import express from "express";

import {
  createShortUrl,
  deleteUrl,
  getUrl,
  updateUrl,
} from "../controllers/shorten.js";
import {
  createShortUrlValidator,
  deleteUrlValidator,
  getUrlValidator,
  updateUrlValidator,
} from "../helpers/validation.js";

const router = express.Router();

// Base route: /shorten

router.post("/", createShortUrlValidator(), createShortUrl);

router.get("/:shortCode", getUrlValidator(), getUrl);
router.put("/:shortCode", updateUrlValidator(), updateUrl);
router.delete("/:shortCode", deleteUrlValidator(), deleteUrl);

export default router;
