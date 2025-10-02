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

    return makeDatabaseResponse(result[0]!, null);
  } catch (error) {
    return makeDatabaseResponse(null, error as Error);
  }
}
