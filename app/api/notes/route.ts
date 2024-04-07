import { db } from "@/db";
import { Episodes, Notes, Podcasts } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export const runtime = "edge";

export async function POST(req: Request) {
  const body = await req.json();

  const { text, episodeTitle, podcastTitle } = body as {
    text?: string;
    episodeTitle?: string;
    podcastTitle?: string;
  };

  if (!text) {
    return new Response("Missing text", { status: 400 });
  }
  if (!episodeTitle) {
    return new Response("Missing episode title", { status: 400 });
  }
  if (!podcastTitle) {
    return new Response("Missing podcast title", { status: 400 });
  }

  let [podcast] = await db
    .select()
    .from(Podcasts)
    .where(eq(Podcasts.title, podcastTitle));

  if (!podcast) {
    const [newPodcast] = await db
      .insert(Podcasts)
      .values({ title: podcastTitle })
      .returning();

    podcast = newPodcast;
  }

  let [episode] = await db
    .select()
    .from(Episodes)
    .where(
      and(eq(Episodes.title, episodeTitle), eq(Episodes.podcastId, podcast.id))
    );

  if (!episode) {
    const [newEpisode] = await db
      .insert(Episodes)
      .values({
        title: episodeTitle,
        podcastId: podcast.id,
      })
      .returning();

    episode = newEpisode;
  }

  const [note] = await db
    .insert(Notes)
    .values({
      text,
      episodeId: episode.id,
    })
    .returning();

  revalidatePath("/");

  return Response.json(note);
}
