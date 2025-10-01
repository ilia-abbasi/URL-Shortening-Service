import type { shortUrlsTable } from "../database/schema";

export interface ResponseObj {
  success: boolean;
  message: string;
  data: object;
}

export type AppSection = "server" | "database";

export type ShortUrl = typeof shortUrlsTable.$inferInsert;
