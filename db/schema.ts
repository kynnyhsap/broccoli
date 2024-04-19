import { createId } from "@paralleldrive/cuid2";
import { sql } from "drizzle-orm";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";

const common = {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),

  createdAt: text("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
};

export const Podcasts = sqliteTable("podcasts", {
  ...common,

  title: text("title").notNull(),
  image: text("image").notNull().default(""),
  twitter: text("twitter").notNull().default(""),
});

export type InsertPodcast = typeof Podcasts.$inferInsert;
export type SelectPodcast = typeof Podcasts.$inferSelect;

export const Episodes = sqliteTable("episodes", {
  ...common,

  title: text("title").notNull(),

  podcastId: text("podcast_id")
    .notNull()
    .references(() => Podcasts.id),
});

export type InsertEpisode = typeof Episodes.$inferInsert;
export type SelectEpisode = typeof Episodes.$inferSelect;

export const Notes = sqliteTable("notes", {
  ...common,

  text: text("text").notNull(),

  episodeId: text("episode_id").references(() => Episodes.id),
});

export type InsertNote = typeof Notes.$inferInsert;
export type SelectNote = typeof Notes.$inferSelect;
