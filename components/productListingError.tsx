"use client";

import { useRouter } from "next/navigation";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProductListingErrorProps {
  message?: string;
}

export function ProductListingError({ message }: ProductListingErrorProps) {
  const router = useRouter();

  return (
    <section
      id="product-listing"
      className="flex min-h-[40vh] flex-col items-center justify-center gap-6 py-12 text-center"
    >
      <div className="flex size-14 items-center justify-center rounded-full bg-destructive/10 text-destructive">
        <AlertCircle className="size-8" />
      </div>
      <div className="max-w-md space-y-2">
        <h2 className="text-2xl font-semibold text-foreground">
          Could not load products
        </h2>
        <p className="text-muted-foreground">
          Something went wrong while loading the products. Please try again
          later.
        </p>
        {process.env.NODE_ENV === "development" && message && (
          <p className="rounded-md border border-border bg-muted/50 px-3 py-2 text-left font-mono text-xs text-muted-foreground break-all">
            {message}
          </p>
        )}
      </div>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button type="button" onClick={() => router.refresh()}>
          Try again
        </Button>
      </div>
    </section>
  );
}
