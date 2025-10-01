import { body } from "express-validator";

export const urlValidator = () =>
  body("url")
    .trim()
    .notEmpty()
    .withMessage("url is required")
    .isString()
    .withMessage("url must be a string")
    .isURL()
    .withMessage("url is not valid");

export const createShortUrlValidator = () => [urlValidator()];
