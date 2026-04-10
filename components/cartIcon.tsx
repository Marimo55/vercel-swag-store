import Link from "next/link";
import { ShoppingBag } from "lucide-react";

export function CartIcon() {
  return (
    <Link
      href="/cart"
      className="relative flex items-center hover:opacity-80 transition-opacity"
    >
      <ShoppingBag className="size-5" />
    </Link>
  );
}
