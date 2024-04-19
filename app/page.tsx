import { LoadMoreButton } from "@/components/load-more-button";
import { NotesList, NotesListSkeleton } from "@/components/notes-list";
import { Suspense } from "react";

// export const runtime = "edge";
// export const preferredRegion = ["arn1"];

export const dynamic = "force-dynamic"; // no caching

export default async function HomePage({
  searchParams,
}: {
  searchParams: { page: string };
}) {
  const pages = Array.from(
    { length: Number(searchParams.page ?? "1") },
    (_, i) => i,
  );

  return (
    <main>
      {pages.map((p) => (
        <Suspense key={p} fallback={<NotesListSkeleton />}>
          <NotesList page={p} />
        </Suspense>
      ))}

      <div className="flex items-center justify-center gap-4 my-32">
        <LoadMoreButton />
      </div>
    </main>
  );
}
