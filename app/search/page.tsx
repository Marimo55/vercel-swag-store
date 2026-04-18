import { Suspense } from "react";
import { Spinner } from "@/components/ui/spinner";
import { getProductCategories } from "@/lib/api";
import { SearchResults } from "@/components/search/searchResults";
import { SearchBar } from "@/components/search/searchBar";
import type { ProductCategory } from "@/lib/types";
import { Skeleton } from "@/components/ui/skeleton";
import { SITE_NAME } from "@/lib/site";

interface SearchPageProps {
  searchParams: Promise<{
    q?: string;
    category?: string;
  }>;
}

export async function generateMetadata({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const query = typeof params.q === "string" ? params.q.trim() : "";
  const category =
    typeof params.category === "string" ? params.category.trim() : "";

  const urlParams = new URLSearchParams();

  if (query) urlParams.set("q", query);
  if (category) urlParams.set("category", category);

  const path = urlParams.toString()
    ? `/search?${urlParams.toString()}`
    : "/search";

  let title = "Search";
  let description =
    "Search by keyword or filter by category in the Vercel Swag Store.";

  if (query && category) {
    title = `Search: ${query} & ${category}`;
    description = `Results for “${query}” in ${category} at ${SITE_NAME}.`;
  } else if (query) {
    title = `Search: ${query}`;
    description = `Search results for “${query}” in the ${SITE_NAME} catalog.`;
  } else if (category) {
    title = `Browse: ${category}`;
    description = `Browse ${category} products at ${SITE_NAME}.`;
  }

  return {
    title,
    description,
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description,
      url: path,
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${SITE_NAME}`,
      description,
    },
  };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { data: categories } = await getProductCategories();

  return (
    <div className="py-10">
      <h1 className="text-3xl font-bold text-foreground">Search products</h1>
      <p className="mt-2 text-muted-foreground">
        Find products by keyword or narrow down by category.
      </p>
      <Suspense fallback={<SearchBarSkeleton />}>
        <SearchBarSection categories={categories} searchParams={searchParams} />
      </Suspense>
      <Suspense fallback={<SearchResultsFallback />}>
        <SearchResults searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

async function SearchBarSection({
  categories,
  searchParams,
}: {
  categories: ProductCategory[];
  searchParams: SearchPageProps["searchParams"];
}) {
  const params = await searchParams;

  return (
    <SearchBar
      categories={categories}
      initialQuery={params.q ?? ""}
      initialCategory={params.category ?? ""}
    />
  );
}

function SearchBarSkeleton() {
  return (
    <div className="flex flex-col gap-6 w-full max-w-5xl m-auto py-10">
      <div className="h-12 w-full">
        <div>
          <Skeleton className="text-muted-foreground rounded-2xl" />
        </div>

        <div className="pr-1">
          <Skeleton className="cursor-pointer h-12 px-5 rounded-2xl" />
        </div>
      </div>

      <div className="flex flex-col gap-2 w-full lg:w-56">
        <label htmlFor="category-filter" className="text-sm font-medium">
          <Skeleton className="rounded-2xl" />
        </label>
        <div>
          <div id="category-filter" className="h-12 w-full">
            <Skeleton className="rounded-2xl" />
          </div>
        </div>
      </div>
    </div>
  );
}

function SearchResultsFallback() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 min-h-48 py-12 text-muted-foreground">
      <Spinner className="size-8" />
      <span className="text-sm">Searching for products…</span>
    </div>
  );
}
