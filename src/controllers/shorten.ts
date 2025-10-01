import type { Request, Response } from "express";

export function createUrl(req: Request, res: Response): Response {
  return res.send("yeah, nah");
}
