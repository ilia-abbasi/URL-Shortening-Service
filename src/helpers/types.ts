import type { shortUrlsTable } from "../database/schema.ts";

export interface ResponseObj {
  success: boolean;
  message: string;
  data: object;
}

export type AppSection = "server" | "database";

export type ShortUrl = typeof shortUrlsTable.$inferInsert;
