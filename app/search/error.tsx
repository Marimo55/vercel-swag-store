"use client";

import { AppErrorFallback } from "@/components/appErrorFallback";

export default function SearchError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <AppErrorFallback
      error={error}
      reset={reset}
      title="Search is not available"
      description="We could not load the search page right now. Try again in a moment or return to the storefront."
    />
  );
}
