import { Suspense } from "react";
import { notFound } from "next/navigation";
import AddToCart from "@/components/addToCart";
import StockStatus from "@/components/stockStatus";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { getProduct, getStockStatus } from "@/lib/api";
import { isApiError } from "@/lib/apiErrors";
import { formatPrice } from "@/lib/utils";
import Image from "next/image";

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function ProductPage({ params }: ProductPageProps) {
  return (
    <Suspense fallback={<ProductPageFallback />}>
      <ProductPageContent params={params} />
    </Suspense>
  );
}

async function ProductPageContent({ params }: ProductPageProps) {
  const { id } = await params;
  let productRes;
  try {
    productRes = await getProduct(id);
  } catch (error) {
    if (isApiError(error) && error.isNotFound) notFound();
    throw error;
  }

  const { data: product } = productRes;
  const { name, description, images, price, currency, tags } = product;
  const formattedPrice = formatPrice(price, currency);

  return (
    <div className="w-full flex flex-col gap-10 py-12 md:flex-row">
      <div className="relative aspect-square w-full md:w-1/2">
        <Image
          className="object-cover"
          src={images[0]}
          fill
          alt={name}
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>

      <div className="flex flex-col gap-5 w-full md:w-1/2">
        <div>
          <h1 className="text-4xl uppercase font-bold">{name}</h1>
          <div className="flex flex-row flex-wrap gap-1 mt-2">
            {tags.length > 0 &&
              tags.map((tag, index) => (
                <Badge variant="outline" key={`${tag}-${index}`}>
                  {tag}
                </Badge>
              ))}
          </div>
        </div>
        <div className="flex flex-row flex-wrap gap-4 items-center justify-center sm:justify-between">
          <span className="text-2xl text-right md:text-4xl">
            {formattedPrice}
          </span>
        </div>

        <Suspense fallback={<ProductPurchaseFallback />}>
          <ProductPurchaseSection productId={product.id} />
        </Suspense>
        <div className="flex flex-col gap-3">
          <h3 className="font-bold text-lg">Description</h3>
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
}

async function ProductPurchaseSection({ productId }: { productId: string }) {
  let stockRes;
  try {
    stockRes = await getStockStatus(productId);
  } catch (error) {
    if (isApiError(error) && error.isNotFound) notFound();
    throw error;
  }

  const { data: stockStatus } = stockRes;

  return (
    <div className="flex flex-col gap-4">
      <StockStatus inStock={stockStatus.inStock} />
      <AddToCart
        productId={productId}
        stock={stockStatus.stock}
        inStock={stockStatus.inStock}
      />
    </div>
  );
}

function ProductPageFallback() {
  return (
    <div className="w-full flex flex-col gap-10 py-12 md:flex-row">
      <Skeleton className="aspect-square w-full md:w-1/2" />
      <div className="flex flex-col gap-5 w-full md:w-1/2">
        <div className="space-y-3">
          <Skeleton className="h-10 w-3/4" />
          <Skeleton className="h-6 w-1/2" />
        </div>
        <Skeleton className="h-10 w-32" />
        <ProductPurchaseFallback />
        <div className="space-y-3">
          <Skeleton className="h-6 w-28" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>
      </div>
    </div>
  );
}

function ProductPurchaseFallback() {
  return (
    <div className="flex flex-col gap-4 items-center sm:items-start">
      <Skeleton className="h-6 w-28" />
      <Skeleton className="h-5 w-32" />
      <Skeleton className="h-14 w-52 rounded-full" />
    </div>
  );
}
