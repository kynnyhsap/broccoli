export function NoteText({ text }: { text: string }) {
  return (
    <div>
      <span>{text}</span>
    </div>
  );
}

export function NoteTextSkeleton() {
  const lines = [
    [16, 44, 16],
    [12, 32, 24, 28],
    [32, 8, 20, 6],
  ];

  return (
    <div className="animate-pulse flex flex-col gap-2.5">
      {lines.map((widths, i) => (
        <div key={i} className="flex items-center gap-2">
          {widths.map((w, j) => (
            <div key={j} className={`h-3.5 rounded bg-gray-200 w-${w}`} />
          ))}
        </div>
      ))}
    </div>
  );
}
