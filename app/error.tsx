"use client";

import { AppErrorFallback } from "@/components/appErrorFallback";

export default function RootError({
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
      title="Something went wrong"
      description="We could not load this page. You can try again or go back to the store home."
    />
  );
}
