import type { Cart } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface OrderSummaryProps {
  cart: Cart;
}

export function OrderSummary({ cart }: OrderSummaryProps) {
  const { items, subtotal, currency } = cart;

  return (
    <div className="w-full lg:w-80 shrink-0 rounded-lg border border-border p-6 flex flex-col gap-4 sticky top-20">
      <h2 className="text-lg font-semibold">Order Summary</h2>

      <div className="flex flex-col gap-2 text-sm">
        {items.map(({ productId, product, quantity, lineTotal }) => (
          <div key={productId} className="flex justify-between">
            <span className="text-muted-foreground">
              {product.name} × {quantity}
            </span>
            <span>{formatPrice(lineTotal, currency)}</span>
          </div>
        ))}
      </div>

      <div className="border-t border-border pt-4 flex justify-between font-semibold">
        <span>Subtotal</span>
        <span>{formatPrice(subtotal, currency)}</span>
      </div>

      <p className="text-xs text-muted-foreground">
        Shipping and taxes calculated at checkout.
      </p>

      <Button className="w-full" size="lg">
        Checkout
      </Button>

      <Link
        className="flex items-center justify-center text-sm font-medium bg-secondary py-2 rounded-lg text-secondary-foreground hover:bg-secondary/80 aria-expanded:bg-secondary aria-expanded:text-secondary-foreground"
        href="/"
      >
        Continue Shopping
      </Link>
    </div>
  );
}
