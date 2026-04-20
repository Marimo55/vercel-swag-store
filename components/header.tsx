import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { CartIcon } from "@/components/cartIcon";
import { CartItemsCountIcon } from "@/components/cartItemsCountIcon";
import { MobileNav } from "@/components/mobileNavigation";
import { NAV_LINKS } from "@/lib/constants";
import { Spinner } from "./ui/spinner";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex items-center h-14 max-w-360 px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          aria-label="Vercel Swag store home"
          className="flex items-center gap-2 font-semibold text-foreground hover:opacity-80 transition-opacity"
        >
          <div className="w-6.25 h-6.25 relative">
            <Image
              src="/vercel.svg"
              alt="Vercel"
              fill
              className="brightness-0 dark:brightness-100 "
            />
          </div>
          <span className="capitalize">Swag store</span>
        </Link>

        <nav
          className="hidden md:flex items-center gap-6 ml-6 text-sm"
          aria-label="Main"
        >
          {NAV_LINKS.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-4">
          <Suspense
            fallback={
              <div className="relative">
                <CartIcon />
                <Spinner className="absolute -top-2 -right-2" />
              </div>
            }
          >
            <CartItemsCountIcon />
          </Suspense>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
