import { NotesList, NotesListSkeleton } from "@/components/notes-list";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  return (
    <main>
      <Suspense fallback={<NotesListSkeleton />}>
        <NotesList />
      </Suspense>
    </main>
  );
}
