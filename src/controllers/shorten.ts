import { Request, Response } from "express-serve-static-core";
import { matchedData, validationResult } from "express-validator";

import { makeResponseObj } from "../helpers/response.js";

export function createShortUrl(req: Request, res: Response): Response {
  const validationError = validationResult(req).array()[0];

  if (validationError) {
    const resObj = makeResponseObj(false, validationError.msg);

    return res.status(400).json(resObj);
  }

  const { url } = matchedData(req);

  return res.send(":)");
}
