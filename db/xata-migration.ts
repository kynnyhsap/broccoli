// this script migrates all the records from xata to the turso database
// make sure you have exported the xata database to csv files

import parse from "csv-simple-parser";

import { db } from ".";
import { Episodes, Notes, Podcasts } from "./schema";

async function csv(filepath: string): Promise<any[]> {
  const result = await Bun.file(filepath).text();
  return parse(result, { header: true });
}

const xataPodcasts = await csv("./Podcasts.csv");
const xataPodcastEpisodes = await csv("./PodcastEpisodes.csv");
const xataPodcastEpisodeNotes = await csv("./PodcastEpisodeNotes.csv");

const podcastsToInsert = xataPodcasts.map((row) => ({
  image: row.image,
  title: row.title,
  twitter: row.twitterHandle,
  createdAt: row["xata.createdAt"],
}));

const insertedPodcasts = await db
  .insert(Podcasts)
  .values(podcastsToInsert)
  .returning();

const episodesToInsert = xataPodcastEpisodes.map((row) => {
  const xataPodcast = xataPodcasts.find(
    (podcast) => podcast.id === row.podcast
  );

  const podcast = insertedPodcasts.find(
    (podcast) => podcast.title === xataPodcast.title
  );

  if (!podcast) {
    console.log({ xataPodcast, row });
    throw new Error(`Podcast not found`);
  }

  return {
    title: row.title,
    podcastId: podcast.id,
    podcast,
    createdAt: row["xata.createdAt"],
  };
});

const insertedEpisodes = await db
  .insert(Episodes)
  .values(episodesToInsert)
  .returning();

const notesToInsert = xataPodcastEpisodeNotes.map((row) => {
  const xataPodcastEpisode = xataPodcastEpisodes.find(
    (episode) => episode.id === row.podcastEpisode
  );

  const episode = insertedEpisodes.find(
    (episode) => episode.title === xataPodcastEpisode.title
  );

  if (!episode) {
    console.log({ xataPodcastEpisode, row });
    throw new Error(`Episode not found`);
  }

  return {
    text: row.text,
    episodeId: episode.id,
    episode,
    createdAt: row["xata.createdAt"],
  };
});

const insertedNotes = await db.insert(Notes).values(notesToInsert).returning();
