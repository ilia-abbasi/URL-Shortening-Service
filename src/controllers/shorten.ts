import { NextFunction, Request, Response } from "express-serve-static-core";
import { matchedData, validationResult } from "express-validator";

import { makeResponseObj } from "../helpers/response.js";
import { DatabaseResponse, ShortUrl } from "../helpers/types.js";
import { customLog, generateKey, generateShortCode } from "../helpers/utils.js";
import * as database from "../database/db.js";

export async function createShortUrl(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> {
  const validationError = validationResult(req).array()[0];

  if (validationError) {
    const resObj = makeResponseObj(false, validationError.msg);

    return res.status(400).json(resObj);
  }

  const { url } = matchedData(req);

  let dbResponse: DatabaseResponse;
  let fails = 0;
  while (true) {
    const shortUrl: ShortUrl = {
      url,
      shortCode: generateShortCode(),
      key: generateKey(),
    };

    dbResponse = await database.insertShortUrl(shortUrl);
    if (!dbResponse.error) {
      break;
    }

    fails++;
    customLog("database", `Possible short code collision (${fails})`);

    if (fails > 4) {
      const error = new Error(
        `Too many collisions, dropping with ${fails} fails`
      );
      return next(error);
    }
  }

  const resObj = makeResponseObj(true, "Created short url", dbResponse.result);

  return res.status(201).json(resObj);
}

export async function getUrl(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> {
  const validationError = validationResult(req).array()[0];

  if (validationError) {
    const resObj = makeResponseObj(false, validationError.msg);

    return res.status(400).json(resObj);
  }

  const shortCode: string = matchedData(req).shortCode;

  const dbResponse = await database.getUrl(shortCode);
  if (dbResponse.error) {
    return next(dbResponse.error);
  }

  if (!dbResponse.result) {
    const resObj = makeResponseObj(false, "Not found");

    return res.status(404).json(resObj);
  }

  const resObj = makeResponseObj(true, "Successful", dbResponse.result);

  return res.status(200).json(resObj);
}

export async function updateUrl(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> {
  const validationError = validationResult(req).array()[0];

  if (validationError) {
    const resObj = makeResponseObj(false, validationError.msg);

    return res.status(400).json(resObj);
  }

  const {
    url,
    shortCode,
    key,
  }: { url: string; shortCode: string; key: string } = matchedData(req);

  const dbResponse = await database.updateUrl(shortCode, key, url);
  if (dbResponse.error) {
    return next(dbResponse.error);
  }

  if (!dbResponse.result) {
    const resObj = makeResponseObj(false, "No short url exists with this key");

    return res.status(404).json(resObj);
  }

  const resObj = makeResponseObj(true, "Successful", dbResponse.result);

  return res.status(200).json(resObj);
}

export async function deleteUrl(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> {
  const validationError = validationResult(req).array()[0];

  if (validationError) {
    const resObj = makeResponseObj(false, validationError.msg);

    return res.status(400).json(resObj);
  }

  const { shortCode, key }: { shortCode: string; key: string } =
    matchedData(req);

  const dbResponse = await database.deleteUrl(shortCode, key);
  if (dbResponse.error) {
    return next(dbResponse.error);
  }

  if (!dbResponse.result) {
    const resObj = makeResponseObj(false, "No short url exists with this key");

    return res.status(404).json(resObj);
  }

  return res.status(204);
}
