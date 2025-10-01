import { drizzle, NodePgDatabase } from "drizzle-orm/node-postgres";
import type { Pool } from "pg";

export let db: NodePgDatabase<Record<string, never>> & {
  $client: Pool;
};

export function connectDb() {
  db = drizzle(process.env.DATABASE_URL!);
}
