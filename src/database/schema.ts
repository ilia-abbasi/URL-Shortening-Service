import {
  integer,
  pgTable,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const shortUrlsTable = pgTable("short_urls", {
  id: serial("id").primaryKey(),
  shortCode: varchar("short_code", { length: 6 }).notNull().unique(),
  url: varchar("url", { length: 512 }).notNull(),
  key: varchar("key", { length: 32 }).notNull(),
  views: integer("views").notNull().default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});
