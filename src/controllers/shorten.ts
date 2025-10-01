import type { Request, Response } from "express";

export function createShortUrl(req: Request, res: Response): Response {
  return res.send("yeah, nah");
}
