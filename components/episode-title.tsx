export function EpisodeTitle({ title }: { title: string }) {
  return <span className="text-sm text-zinc-400">{title}</span>;
}

export function EpisodeTitleSkeleton() {
  return (
    <div className="animate-pulse h-2.5 w-72 bg-zinc-400 rounded my-2.5" />
  );
}
