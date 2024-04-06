import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { db } from "@/db";
import { Episodes, Notes, Podcasts } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import Link from "next/link";

export default async function HomePage() {
  console.time("select");
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
      // twitterHandle: Podcasts.twitter,
    })
    .from(Notes)
    .leftJoin(Episodes, eq(Notes.episodeId, Episodes.id))
    .leftJoin(Podcasts, eq(Episodes.podcastId, Podcasts.id))
    .orderBy(desc(Notes.createdAt))
    .all();
  console.timeEnd("select");

  return (
    <main className="max-w-[600px] mx-auto p-8">
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
          <div key={id} className="my-16">
            <Link href={`/episode/${episodeId}`} className="opacity-50">
              <div className="flex items-center gap-4">
                <Avatar className="rounded">
                  <AvatarImage src={image ?? ""} />
                  <AvatarFallback className="rounded">
                    {podcastTitle?.[0] ?? ""}
                  </AvatarFallback>
                </Avatar>

                <span className="text-sm text-purple-300">{podcastTitle}</span>
              </div>

              <div className="my-2 text-sm text-orange-300">{episodeTitle}</div>
            </Link>

            <div>
              <span>{text}</span>
            </div>
          </div>
        )
      )}
    </main>
  );
}
