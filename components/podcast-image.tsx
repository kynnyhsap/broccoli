import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function PodcastImage({ image }: { image: string }) {
  return (
    <Avatar className="rounded">
      <AvatarImage src={image} />
      <AvatarFallback className="rounded">🥦</AvatarFallback>
    </Avatar>
  );
}
