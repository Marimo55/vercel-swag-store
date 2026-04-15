import AddToCart from "@/components/addToCart";
import StockStatus from "@/components/stockStatus";
import { Badge } from "@/components/ui/badge";
import { getProduct, getStockStatus } from "@/lib/api";
import { formatPrice } from "@/lib/utils";
import Image from "next/image";

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;

  const [productRes, stockRes] = await Promise.all([
    getProduct(id),
    getStockStatus(id),
  ]);

  const { data: product } = productRes;
  const { data: stockStatus } = stockRes;
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
          <StockStatus inStock={stockStatus.inStock} />
          <span className="text-2xl text-right md:text-4xl">
            {formattedPrice}
          </span>
        </div>

        <div>
          <AddToCart
            productId={product.id}
            stock={stockStatus.stock}
            inStock={stockStatus.inStock}
          />
        </div>
        <div className="flex flex-col gap-3">
          <h3 className="font-bold text-lg">Description</h3>
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
}
