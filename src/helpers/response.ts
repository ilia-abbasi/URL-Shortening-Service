import {
  NextFunction,
  Request,
  RequestHandler,
  Response,
} from "express-serve-static-core";

import { ResponseObj } from "./types.js";
import { customLog } from "./utils.js";

export function makeResponseObj(
  success: boolean,
  message: string,
  data: object | null = {}
): ResponseObj {
  if (!data) {
    data = {};
  }
  return { success, message, data };
}

export function send404Error(req: Request, res: Response): Response {
  const resObj = makeResponseObj(false, "Not found");

  return res.status(404).json(resObj);
}

export function send405Error(allowedMethods: string[]): RequestHandler {
  let allowHeaderValue = "";

  for (const allowedMethod of allowedMethods) {
    allowHeaderValue = `${allowHeaderValue}${allowedMethod}, `;
  }
  allowHeaderValue = allowHeaderValue.slice(0, -2);

  return (req: Request, res: Response): Response => {
    const resObj = makeResponseObj(
      false,
      `You can not ${req.method} ${req.baseUrl + req.path}`
    );

    res.set("Allow", allowHeaderValue);
    return res.status(405).json(resObj);
  };
}

export function generalErrorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): Response {
  customLog("server", `[ERROR] ${err.message}`);
  customLog("server", err.stack!);

  const resObj = makeResponseObj(
    false,
    "Something went wrong while completing your request"
  );

  return res.status(500).json(resObj);
}

export const limitResponse = makeResponseObj(
  false,
  "You have reached your request limit"
);
