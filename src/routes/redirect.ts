import express from "express";

import { redirectUrlValidator } from "../helpers/validation";
import { redirectUrl } from "../controllers/redirect";
import { send405Error } from "../helpers/response";

const router = express.Router();

// Base route: /

router.get("/:shortCode", redirectUrlValidator(), redirectUrl);
router.all("/:shortCode", send405Error(["GET"]));

export default router;
