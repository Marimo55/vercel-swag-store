"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface CartCountContextValue {
  cartCount: number;
  setCartCount: (count: number) => void;
}

const CartCountContext = createContext<CartCountContextValue | null>(null);

export function useCartCount() {
  const ctx = useContext(CartCountContext);
  if (!ctx)
    throw new Error("useCartCount must be used within CartCountProvider");
  return ctx;
}

export function CartCountProvider({
  children,
  initialCount = 0,
}: {
  children: ReactNode;
  initialCount?: number;
}) {
  const [cartCount, setCartCount] = useState(initialCount);

  return (
    <CartCountContext.Provider value={{ cartCount, setCartCount }}>
      {children}
    </CartCountContext.Provider>
  );
}
