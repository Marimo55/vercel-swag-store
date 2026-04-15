import { ProductCard } from "@/components/productCard";
import { getProducts } from "@/lib/api";
import { SEARCH_DEFAULT_LIMIT, SEARCH_RESULTS_LIMIT } from "@/lib/constants";
import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { TextSearch } from "lucide-react";

interface SearchResultsProps {
  query: string;
  hasQueryParam: boolean;
  categorySlug: string;
}

export async function SearchResults({
  query,
  hasQueryParam,
  categorySlug,
}: SearchResultsProps) {
  const trimmed = query.trim();
  const isSearch = hasQueryParam && trimmed.length > 0;
  const response = isSearch
    ? await getProducts({
        search: trimmed,
        category: categorySlug,
        page: 1,
        limit: SEARCH_RESULTS_LIMIT,
      })
    : await getProducts({
        category: categorySlug,
        page: 1,
        limit: SEARCH_DEFAULT_LIMIT,
      });

  const searchTitle =
    trimmed && categorySlug
      ? `Results for "${trimmed}" & "${categorySlug}"`
      : `Results for "${trimmed}"`;

  const browseTitle = categorySlug
    ? `Browse: ${categorySlug}`
    : "Browse products";

  const products = response.data;

  if (!products.length) {
    return (
      <Empty className="border py-30">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <TextSearch />
          </EmptyMedia>
          <EmptyTitle className="text-lg text-muted-foreground">
            {isSearch ? (
              <span>
                No products match &ldquo;{trimmed}&rdquo;. Try different words
                or another category.
              </span>
            ) : (
              <span>No products in this category yet.</span>
            )}
          </EmptyTitle>
        </EmptyHeader>
      </Empty>
    );
  }

  return (
    <section>
      <h2 className="text-2xl font-semibold text-foreground mb-6">
        {isSearch ? searchTitle : browseTitle}
      </h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
