import { drizzle, NodePgDatabase } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import {
  DatabaseError,
  DatabaseResponse,
  DatabaseResult,
  ShortUrl,
} from "../helpers/types.js";
import { shortUrlsTable } from "./schema.js";
import { customLog } from "../helpers/utils.js";
import { and, DrizzleQueryError, eq, sql } from "drizzle-orm";

let db: NodePgDatabase<Record<string, never>> & {
  $client: Pool;
};

export function connectDb() {
  db = drizzle(process.env.DATABASE_URL!);

  customLog("database", "Connected via drizzle");
}

function makeDatabaseResponse(
  result: DatabaseResult,
  error: DatabaseError
): DatabaseResponse {
  return { result, error };
}

export async function insertShortUrl(
  shortUrl: ShortUrl
): Promise<DatabaseResponse> {
  try {
    const result: ShortUrl[] = await db
      .insert(shortUrlsTable)
      .values(shortUrl)
      .returning();

    return makeDatabaseResponse(result[0], null);
  } catch (error) {
    return makeDatabaseResponse(null, error as Error);
  }
}

export async function getUrl(shortCode: string): Promise<DatabaseResponse> {
  try {
    const result = await db
      .select({
        url: shortUrlsTable.url,
        shortCode: shortUrlsTable.shortCode,
      })
      .from(shortUrlsTable)
      .where(eq(shortUrlsTable.shortCode, shortCode));

    return makeDatabaseResponse(result[0], null);
  } catch (error) {
    return makeDatabaseResponse(null, error as Error);
  }
}

export async function updateUrl(
  shortCode: string,
  key: string,
  url: string
): Promise<DatabaseResponse> {
  try {
    const result = await db
      .update(shortUrlsTable)
      .set({
        url: url,
        updatedAt: sql`NOW()`,
      })
      .where(
        and(
          eq(shortUrlsTable.shortCode, shortCode),
          eq(shortUrlsTable.key, key)
        )
      )
      .returning({
        id: shortUrlsTable.id,
        url: shortUrlsTable.url,
        shortCode: shortUrlsTable.shortCode,
        createdAt: shortUrlsTable.createdAt,
        updatedAt: shortUrlsTable.updatedAt,
      });

    return makeDatabaseResponse(result[0], null);
  } catch (error) {
    return makeDatabaseResponse(null, error as Error);
  }
}

export async function deleteUrl(
  shortCode: string,
  key: string
): Promise<DatabaseResponse> {
  try {
    const result = await db
      .delete(shortUrlsTable)
      .where(
        and(
          eq(shortUrlsTable.shortCode, shortCode),
          eq(shortUrlsTable.key, key)
        )
      );

    return makeDatabaseResponse(result.rowCount ? result : null, null);
  } catch (error) {
    return makeDatabaseResponse(null, error as Error);
  }
}

export async function getUrlStats(
  shortCode: string,
  key: string
): Promise<DatabaseResponse> {
  try {
    const result = await db
      .select({
        id: shortUrlsTable.id,
        url: shortUrlsTable.url,
        shortCode: shortUrlsTable.shortCode,
        createdAt: shortUrlsTable.createdAt,
        updatedAt: shortUrlsTable.updatedAt,
        views: shortUrlsTable.views,
      })
      .from(shortUrlsTable)
      .where(
        and(
          eq(shortUrlsTable.shortCode, shortCode),
          eq(shortUrlsTable.key, key)
        )
      );

    return makeDatabaseResponse(result[0], null);
  } catch (error) {
    return makeDatabaseResponse(null, error as Error);
  }
}

export async function redirectUrl(
  shortCode: string
): Promise<DatabaseResponse> {
  try {
    const result = await db
      .update(shortUrlsTable)
      .set({
        views: sql`${shortUrlsTable.views} + 1`,
      })
      .where(eq(shortUrlsTable.shortCode, shortCode))
      .returning({
        url: shortUrlsTable.url,
      });

    return makeDatabaseResponse(result[0], null);
  } catch (error) {
    return makeDatabaseResponse(null, error as Error);
  }
}
