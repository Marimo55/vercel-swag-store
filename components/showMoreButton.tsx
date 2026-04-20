"use client";

import { useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Spinner } from "./ui/spinner";

interface ShowMoreButtonProps {
  currentPage: number;
  hasNextPage: boolean;
}

export function ShowMoreButton({
  currentPage,
  hasNextPage,
}: ShowMoreButtonProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  if (!hasNextPage) return null;

  function handleShowMore() {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(currentPage + 1));
    const query = params.toString();

    const href = query ? `${pathname}?${query}` : pathname;
    startTransition(() => {
      router.push(href, { scroll: false });
    });
  }

  return (
    <Button
      type="button"
      onClick={handleShowMore}
      disabled={isPending}
      aria-busy={isPending}
      size="lg"
      className="w-full sm:w-auto cursor-pointer"
    >
      {isPending ? (
        <span className="flex items-center gap-2">
          Loading
          <Spinner />
        </span>
      ) : (
        <span>Show More Products</span>
      )}
    </Button>
  );
}
