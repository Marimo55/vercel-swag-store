"use client";

import { AppErrorFallback } from "@/components/appErrorFallback";

export default function ProductError({
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
      title="Could not load this product"
      description="The product details could not be loaded. Check your connection and try again, or browse from the home page."
    />
  );
}
