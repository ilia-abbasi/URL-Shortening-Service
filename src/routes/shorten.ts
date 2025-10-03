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
import { send405Error } from "../helpers/response.js";

const router = express.Router();

// Base route: /shorten

router.post("/", createShortUrlValidator(), createShortUrl);
router.all("/", send405Error(["POST"]));

router.get("/:shortCode", getUrlValidator(), getUrl);
router.put("/:shortCode", updateUrlValidator(), updateUrl);
router.delete("/:shortCode", deleteUrlValidator(), deleteUrl);
router.all("/:shortCode", send405Error(["GET", "PUT", "DELETE"]));

router.get("/:shortCode/stats", getUrlStatsValidator(), getUrlStats);
router.all("/:shortCode/stats", send405Error(["GET"]));

export default router;
