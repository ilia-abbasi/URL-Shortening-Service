import { shortUrlsTable } from "../database/schema.js";

export interface ResponseObj {
  success: boolean;
  message: string;
  data: object;
}

export interface DatabaseResponse {
  result: DatabaseResult;
  error: DatabaseError;
}

export type DatabaseError = Error | null;

export type DatabaseResult = Object | Object[] | null;

export type AppSection = "server" | "database";

export type ShortUrl = typeof shortUrlsTable.$inferInsert;
