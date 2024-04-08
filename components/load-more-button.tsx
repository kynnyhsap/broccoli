"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "./ui/button";

export function LoadMoreButton() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const currentPage = Number(searchParams.get("page") ?? "1");

  function onClick() {
    const params = new URLSearchParams(searchParams);

    params.set("page", String(currentPage + 1));

    replace(`${pathname}?${params.toString()}`, {
      scroll: false,
    });
  }

  return <Button onClick={onClick}>Load more</Button>;
}
