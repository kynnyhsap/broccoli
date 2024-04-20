import { db } from "@/db";
import { Episodes, Notes, Podcasts } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import Link from "next/link";
import { PodcastTitle, PodcastTitleSkeleton } from "./podcast-title";
import { NoteText, NoteTextSkeleton } from "./note-text";
import { EpisodeTitle, EpisodeTitleSkeleton } from "./episode-title";
import { truncate } from "@/lib/truncate";

const LIMIT = 50;

export async function NotesList({ page }: { page: number }) {
  console.time(`getting notes for page ${page}`);

  const notes = await db
    .select({
      id: Notes.id,
      text: Notes.text,
      episodeId: Notes.episodeId,
      episodeTitle: Episodes.title,
      podcastId: Episodes.podcastId,
      podcastTitle: Podcasts.title,
      image: Podcasts.image,
      createdAt: Notes.createdAt,
    })
    .from(Notes)
    .innerJoin(Episodes, eq(Notes.episodeId, Episodes.id))
    .innerJoin(Podcasts, eq(Episodes.podcastId, Podcasts.id))
    .orderBy(desc(Notes.createdAt))
    .limit(LIMIT)
    .offset(LIMIT * page);

  console.timeEnd(`getting notes for page ${page}`);

  return (
    <div className="max-w-[480px] mx-auto px-8">
      {notes.map(
        ({
          id,
          text,
          episodeId,
          episodeTitle,
          podcastId,
          podcastTitle,
          image,
        }) => (
          <div key={id} className="my-16 flex flex-col gap-4">
            <Link href={`/podcast/${podcastId}`} className="opacity-40">
              <PodcastTitle title={podcastTitle} image={image} />
            </Link>

            <Link href={`/episode/${episodeId}`} className="opacity-40">
              <EpisodeTitle title={truncate(episodeTitle, 35)} />
            </Link>

            <NoteText text={text} />
          </div>
        ),
      )}
    </div>
  );
}

export function NotesListSkeleton() {
  return (
    <div className="max-w-[480px] mx-auto px-8">
      {Array(3)
        .fill(0)
        .map((_, i) => (
          <div key={i} className="my-16 flex flex-col gap-4">
            <PodcastTitleSkeleton />

            <EpisodeTitleSkeleton />

            <NoteTextSkeleton />
          </div>
        ))}
    </div>
  );
}
