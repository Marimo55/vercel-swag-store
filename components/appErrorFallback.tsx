"use client";

import Link from "next/link";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AppErrorFallbackProps {
  error: Error;
  reset: () => void;
  title: string;
  description: string;
}

export function AppErrorFallback({
  error,
  reset,
  title,
  description,
}: AppErrorFallbackProps) {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-6 py-16 text-center">
      <div className="flex size-14 items-center justify-center rounded-full bg-destructive/10 text-destructive">
        <AlertCircle className="size-8" />
      </div>
      <div className="max-w-md space-y-2">
        <h1 className="text-2xl font-semibold text-foreground">{title}</h1>
        <p className="text-muted-foreground">{description}</p>
        {process.env.NODE_ENV === "development" && (
          <p className="rounded-md border border-border bg-muted/50 px-3 py-2 text-left font-mono text-xs text-muted-foreground break-all">
            {error.message}
          </p>
        )}
      </div>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button type="button" onClick={() => reset()}>
          Try again
        </Button>
        <Link
          className="inline-flex h-9 items-center justify-center rounded-lg border border-border bg-background px-4 text-sm font-medium text-foreground transition-colors hover:bg-muted"
          href="/"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
}
