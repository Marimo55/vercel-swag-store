import { Suspense } from "react";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { getCart } from "@/lib/cartActions";
import { CartItem } from "@/components/cart/cartItem";
import { OrderSummary } from "@/components/cart/orderSummary";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Spinner } from "@/components/ui/spinner";
import { SITE_NAME } from "@/lib/site";

export const metadata = {
  title: "Cart",
  description: `Review items, quantities, and your subtotal before checkout at ${SITE_NAME}.`,
  openGraph: {
    title: `Cart | ${SITE_NAME}`,
    description: `Review your shopping cart at ${SITE_NAME}.`,
    url: "/cart",
  },
  twitter: {
    card: "summary",
    title: `Cart | ${SITE_NAME}`,
    description: `Review your shopping cart at ${SITE_NAME}.`,
  },
};

async function CartContents() {
  const cart = await getCart();

  if (!cart || cart.items.length === 0) {
    return (
      <Empty className="border py-30 mt-10">
        <EmptyHeader>
          <EmptyMedia variant="default">
            <ShoppingCart size="50" />
          </EmptyMedia>
          <EmptyTitle className="text-3xl text-muted-foreground capitalize">
            Your cart is currently empty!
          </EmptyTitle>
          <EmptyDescription>
            Before proceed to checkout you must add some products to your
            shopping cart. You will find a lot of interesting products on our
            page.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent className="max-w-50">
          <Link
            className="flex items-center w-full justify-center text-sm font-medium bg-secondary py-2 rounded-lg text-secondary-foreground hover:bg-secondary/80 aria-expanded:bg-secondary aria-expanded:text-secondary-foreground"
            href="/"
          >
            Continue Shopping
          </Link>
        </EmptyContent>
      </Empty>
    );
  }

  const { items, currency } = cart;

  return (
    <div className="py-10 flex flex-col gap-8">
      <h1 className="text-3xl font-bold">Your Cart</h1>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        <ul className="flex flex-col divide-y divide-border w-full lg:flex-1">
          {items.map((item) => (
            <CartItem key={item.productId} item={item} currency={currency} />
          ))}
        </ul>

        <OrderSummary cart={cart} />
      </div>
    </div>
  );
}

export default function CartPage() {
  return (
    <Suspense
      fallback={
        <div className="py-10 flex flex-col items-center justify-center gap-2">
          <Spinner className="size-10 m-auto" />
          <span>Loading your cart...</span>
        </div>
      }
    >
      <CartContents />
    </Suspense>
  );
}
