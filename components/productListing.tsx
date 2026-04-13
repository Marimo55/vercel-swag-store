import { getProducts } from "@/lib/api";
import { ProductCard } from "@/components/productCard";
import { ShowMoreButton } from "@/components/showMoreButton";
import { PRODUCT_LIST_PAGE_SIZE } from "@/lib/constants";

interface ProductListingProps {
  searchParams?: {
    page?: string;
  };
}

export async function ProductListing({ searchParams }: ProductListingProps) {
  const page = Math.max(1, Number(searchParams?.page) || 1);
  const limit = page * PRODUCT_LIST_PAGE_SIZE;

  const response = await getProducts({ page: 1, limit });
  const products = response.data;
  const totalProducts = response.meta?.pagination?.total ?? 0;
  const hasNextPage = response.meta?.pagination?.hasNextPage ?? false;

  return (
    <section id="product-listing" className=" pb-12">
      <h2 className="text-3xl font-bold text-foreground mb-8">
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
