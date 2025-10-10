import express from "express";

import { redirectUrlValidator } from "../helpers/validation.js";
import { redirectUrl } from "../controllers/redirect.js";
import { send405Error } from "../helpers/response.js";

const router = express.Router();

// Base route: /

router.get("/:shortCode", redirectUrlValidator(), redirectUrl);
router.all("/:shortCode", send405Error(["GET"]));

export default router;
