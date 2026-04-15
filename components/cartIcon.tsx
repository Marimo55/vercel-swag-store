"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useCartCount } from "@/lib/cartCountContext";

export function CartIcon() {
  const { cartCount } = useCartCount();

  return (
    <Link
      href="/cart"
      className="relative flex items-center hover:opacity-80 transition-opacity"
    >
      <ShoppingBag className="size-5" />
      {cartCount > 0 && (
        <span className="absolute -top-2 -right-2 flex size-4 items-center justify-center rounded-full bg-foreground text-[10px] font-semibold text-background">
          {cartCount}
        </span>
      )}
    </Link>
  );
}
