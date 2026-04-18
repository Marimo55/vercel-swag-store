import Link from "next/link";
import { FileQuestion } from "lucide-react";
import { SITE_NAME } from "@/lib/site";

export const metadata = {
  title: "Page not found",
  description: `The page you requested does not exist on ${SITE_NAME}.`,
  robots: { index: false, follow: true },
  openGraph: {
    title: `Page not found | ${SITE_NAME}`,
    description: `The page you requested does not exist on ${SITE_NAME}.`,
  },
  twitter: {
    card: "summary",
    title: `Page not found | ${SITE_NAME}`,
    description: `The page you requested does not exist on ${SITE_NAME}.`,
  },
};

export default function NotFound() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-6 py-16 text-center">
      <div className="flex size-14 items-center justify-center rounded-full bg-muted text-muted-foreground">
        <FileQuestion className="size-8" />
      </div>
      <div className="max-w-md space-y-2">
        <h1 className="text-2xl font-semibold text-foreground">
          Page not found
        </h1>
        <p className="text-muted-foreground">
          That URL does not match anything in the Vercel Swag Store. Try
          searching or head back home.
        </p>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className="inline-flex h-9 items-center justify-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Back to home
        </Link>
        <Link
          href="/search"
          className="inline-flex h-9 items-center justify-center rounded-lg border border-border bg-background px-4 text-sm font-medium text-foreground transition-colors hover:bg-muted"
        >
          Search products
        </Link>
      </div>
    </div>
  );
}
