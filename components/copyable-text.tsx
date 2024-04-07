"use client";

import { useToast } from "@/components/ui/use-toast";

export function CopyableText({ children }: { children: string }) {
  const { toast } = useToast();

  async function onCopy() {
    await navigator.clipboard.writeText(children);

    toast({
      title: "Copied to clipboard ✅",
      duration: 1000,
    });
  }

  return (
    <span onClick={onCopy} className="cursor-pointer">
      {children}
    </span>
  );
}
