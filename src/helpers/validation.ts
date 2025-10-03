import { body, param, query } from "express-validator";

export const urlValidator = () =>
  body("url")
    .trim()
    .notEmpty()
    .withMessage("url is required")
    .isString()
    .withMessage("url must be a string")
    .isURL()
    .withMessage("url is not valid");

export const shortCodeValidator = () =>
  param("shortCode")
    .trim()
    .notEmpty()
    .withMessage("shortCode is required")
    .isString()
    .withMessage("shortCode must be a string")
    .isLength({ min: 6, max: 6 })
    .withMessage("shortCode length must be 6");

export const keyValidator = () =>
  query("key")
    .trim()
    .notEmpty()
    .withMessage("key is required")
    .isString()
    .withMessage("key must be a string")
    .isLength({ min: 32, max: 32 })
    .withMessage("key length must be 32");

export const createShortUrlValidator = () => [urlValidator()];

export const getUrlValidator = () => [shortCodeValidator()];

export const updateUrlValidator = () => [
  urlValidator(),
  shortCodeValidator(),
  keyValidator(),
];
