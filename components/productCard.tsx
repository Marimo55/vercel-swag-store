import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/lib/types";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatPrice } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const formattedPrice = formatPrice(product.price, product.currency);

  return (
    <Link href={`/products/${product.slug}`}>
      <Card className="group flex flex-col gap-3 p-4 transition-all hover:shadow-md">
        <div className="relative aspect-square overflow-hidden rounded-md bg-muted">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform group-hover:scale-105"
            loading="lazy"
          />
        </div>

        <CardHeader className="flex flex-col gap-1">
          <CardTitle className="font-medium text-foreground">
            {product.name}
          </CardTitle>
          <CardDescription>{formattedPrice}</CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
}
