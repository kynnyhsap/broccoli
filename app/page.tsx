import { NotesList, NotesListSkeleton } from "@/components/notes-list";
import { Suspense } from "react";

export default async function HomePage() {
  return (
    <main>
      <Suspense fallback={<NotesListSkeleton />}>
        <NotesList />
      </Suspense>
    </main>
  );
}
