import { createId } from "@paralleldrive/cuid2";
import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

const common = {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),

  createdAt: timestamp("created_at").defaultNow().notNull(),
};

export const Podcasts = pgTable("podcasts", {
  ...common,

  title: text("title").notNull(),
  image: text("image").notNull().default(""),
  twitter: text("twitter").notNull().default(""),
});

export type InsertPodcast = typeof Podcasts.$inferInsert;
export type SelectPodcast = typeof Podcasts.$inferSelect;

export const Episodes = pgTable("episodes", {
  ...common,

  title: text("title").notNull(),

  podcastId: text("podcast_id")
    .notNull()
    .references(() => Podcasts.id),
});

export type InsertEpisode = typeof Episodes.$inferInsert;
export type SelectEpisode = typeof Episodes.$inferSelect;

export const Notes = pgTable("notes", {
  ...common,

  text: text("text").notNull(),

  episodeId: text("episode_id").references(() => Episodes.id),
});

export type InsertNote = typeof Notes.$inferInsert;
export type SelectNote = typeof Notes.$inferSelect;
