import { PodcastImage } from "./podcast-image";

export function PodcastTitle({
  title,
  image,
}: {
  title: string;
  image: string;
}) {
  return (
    <div className="flex items-center gap-4">
      <PodcastImage image={image} />

      <span className="text-xs text-purple-200">{title}</span>
    </div>
  );
}

export function PodcastTitleSkeleton() {
  return (
    <div className="flex items-center gap-4">
      <PodcastImage image={""} />

      <span className="animate-pulse h-2 w-36 bg-purple-200 rounded" />
    </div>
  );
}
