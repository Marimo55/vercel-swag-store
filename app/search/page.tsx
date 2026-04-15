import { Suspense } from "react";
import { Spinner } from "@/components/ui/spinner";
import { getProductCategories } from "@/lib/api";
import { SearchResults } from "@/components/search/searchResults";
import { SearchBar } from "@/components/search/searchBar";

interface SearchPageProps {
  searchParams: Promise<{
    q?: string;
    category?: string;
  }>;
}

function SearchResultsFallback() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 min-h-48 py-12 text-muted-foreground">
      <Spinner className="size-8" />
      <span className="text-sm">Searching for products…</span>
    </div>
  );
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const hasQueryParam = "q" in params;
  const query = typeof params.q === "string" ? params.q : "";
  const categorySlug =
    typeof params.category === "string" ? params.category : "";

  const { data: categories } = await getProductCategories();

  return (
    <div className="py-10">
      <h1 className="text-3xl font-bold text-foreground">Search products</h1>
      <p className="mt-2 text-muted-foreground">
        Find products by keyword or narrow down by category.
      </p>
      <SearchBar categories={categories} />
      <Suspense
        key={`${query}-${categorySlug}`}
        fallback={<SearchResultsFallback />}
      >
        <SearchResults
          query={query}
          hasQueryParam={hasQueryParam}
          categorySlug={categorySlug}
        />
      </Suspense>
    </div>
  );
}
