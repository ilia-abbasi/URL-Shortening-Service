import { Request, Response } from "express-serve-static-core";
import { matchedData, validationResult } from "express-validator";

import { makeResponseObj } from "../helpers/response.js";
import { DatabaseResponse, ShortUrl } from "../helpers/types.js";
import { customLog, generateKey, generateShortCode } from "../helpers/utils.js";
import { insertShortUrl } from "../database/db.js";

export async function createShortUrl(
  req: Request,
  res: Response
): Promise<Response> {
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

    dbResponse = await insertShortUrl(shortUrl);
    if (!dbResponse.error) {
      break;
    }

    fails++;
    customLog("database", `Possible unique short code collision (${fails})`);
  }

  const resObj = makeResponseObj(true, "Created short url", dbResponse.result);

  return res.status(201).json(resObj);
}
