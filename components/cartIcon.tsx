"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useCartCount } from "@/lib/cartCountContext";

interface CartIconProps {
  itemsCount?: number;
}

export function CartIcon({ itemsCount }: CartIconProps) {
  const { cartCount, setCartCount } = useCartCount();

  useEffect(() => {
    if (typeof itemsCount === "number") {
      setCartCount(itemsCount);
    }
  }, [itemsCount, setCartCount]);

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
