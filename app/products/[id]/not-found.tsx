import Link from "next/link";
import { PackageX } from "lucide-react";

export default function ProductNotFound() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-6 py-16 text-center">
      <div className="flex size-14 items-center justify-center rounded-full bg-muted text-muted-foreground">
        <PackageX className="size-8" />
      </div>
      <div className="max-w-md space-y-2">
        <h1 className="text-2xl font-semibold text-foreground">
          Product not found
        </h1>
        <p className="text-muted-foreground">
          We could not find a product at this link. It may have been removed or
          the URL might be incorrect.
        </p>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/search"
          className="inline-flex h-9 items-center justify-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Browse products
        </Link>
        <Link
          href="/"
          className="inline-flex h-9 items-center justify-center rounded-lg border border-border bg-background px-4 text-sm font-medium text-foreground transition-colors hover:bg-muted"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
}
