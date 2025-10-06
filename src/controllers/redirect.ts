import { NextFunction, Request, Response } from "express-serve-static-core";
import { matchedData, validationResult } from "express-validator";

import { makeResponseObj } from "../helpers/response.js";
import { DatabaseResponse, ShortUrl } from "../helpers/types.js";
import * as database from "../database/db.js";

export async function redirectUrl(
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

  const dbResponse = await database.redirectUrl(shortCode);
  if (dbResponse.error) {
    return next(dbResponse.error);
  }

  if (!dbResponse.result) {
    const resObj = makeResponseObj(false, "url not found");

    return res.status(404).json(resObj);
  }

  const { url } = dbResponse.result as ShortUrl;

  res.redirect(301, url);
}
