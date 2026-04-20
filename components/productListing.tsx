import { getProducts } from "@/lib/api";
import { ProductCard } from "@/components/productCard";
import { ProductListingError } from "@/components/productListingError";
import { ShowMoreButton } from "@/components/showMoreButton";
import { PRODUCT_LIST_PAGE_SIZE } from "@/lib/constants";

interface ProductListingProps {
  searchParams: Promise<{
    page?: string;
  }>;
}

export async function ProductListing({ searchParams }: ProductListingProps) {
  const params = await searchParams;
  const page = Math.max(1, Number(params.page) || 1);
  const limit = page * PRODUCT_LIST_PAGE_SIZE;

  let response;
  try {
    response = await getProducts({ page: 1, limit });
  } catch (e) {
    const message = e instanceof Error ? e.message : undefined;
    return <ProductListingError message={message} />;
  }

  const products = response.data;
  const totalProducts = response.meta?.pagination?.total ?? 0;
  const hasNextPage = response.meta?.pagination?.hasNextPage ?? false;

  return (
    <section
      id="product-listing"
      className=" pb-12"
      aria-labelledby="featured-products-heading"
    >
      <h2
        id="featured-products-heading"
        className="text-3xl font-bold text-foreground mb-8"
      >
        Featured Products
      </h2>

      <div className="flex flex-col gap-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="flex flex-col items-center gap-4">
          <p className="text-sm text-muted-foreground">
            Showing {products.length} of {totalProducts} products
          </p>
          <ShowMoreButton currentPage={page} hasNextPage={hasNextPage} />
        </div>
      </div>
    </section>
  );
}
