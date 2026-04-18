"use client";

import { AppErrorFallback } from "@/components/appErrorFallback";

export default function CartPageError({
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
      title="Could not load your cart"
      description="We could not reach the server or load your cart. Try again, or continue shopping from the home page."
    />
  );
}
