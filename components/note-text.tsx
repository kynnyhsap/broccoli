import { CopyableText } from "./copyable-text";

export function NoteText({ text }: { text: string }) {
  return (
    <div>
      <CopyableText>{text}</CopyableText>
    </div>
  );
}

const lines = [
  [16, 44, 16],
  [12, 32, 24, 28],
  [32, 8, 20, 6],
];

export function NoteTextSkeleton() {
  return (
    <div className="animate-pulse flex flex-col gap-2.5">
      {lines.map((widths, i) => (
        <LineSkeleton key={i} widths={widths} />
      ))}
    </div>
  );
}

function LineSkeleton({ widths }: { widths: number[] }) {
  return (
    <div className="flex items-center gap-2">
      {widths.map((w, j) => (
        <div
          key={j}
          className="h-3.5 rounded bg-gray-200"
          style={{
            width: `${w * 4}px`,
          }}
        />
      ))}
    </div>
  );
}
