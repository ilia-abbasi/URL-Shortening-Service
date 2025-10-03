import express from "express";

import { redirectUrlValidator } from "../helpers/validation";

const router = express.Router();

// Base route: /

router.get("/:shortCode", redirectUrlValidator());

export default router;
