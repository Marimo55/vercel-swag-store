import type { CartItem } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { CartItemActions } from "@/components/cart/cartItemActions";

interface CartItemProps {
  item: CartItem;
  currency: string;
}

export function CartItem({ item, currency }: CartItemProps) {
  const { productId, product, quantity, lineTotal } = item;

  return (
    <li className="flex gap-4 py-6 first:pt-0">
      <Link
        href={`/products/${product.slug}`}
        className="relative size-24 shrink-0 overflow-hidden rounded-md bg-muted"
      >
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="96px"
          className="object-cover"
        />
      </Link>

      <div className="flex flex-1 flex-col gap-2">
        <div className="flex items-start justify-between gap-4">
          <Link
            href={`/products/${product.slug}`}
            className="font-medium hover:underline"
          >
            {product.name}
          </Link>
          <span className="shrink-0 font-semibold">
            {formatPrice(lineTotal, currency)}
          </span>
        </div>

        <p className="text-sm text-muted-foreground">
          {formatPrice(product.price, currency)} each
        </p>

        <CartItemActions
          productId={productId}
          quantity={quantity}
          productName={product.name}
        />
      </div>
    </li>
  );
}
