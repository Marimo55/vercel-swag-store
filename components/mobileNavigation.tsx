"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { NAV_LINKS } from "@/lib/constants";

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden p-2 -mr-2 hover:opacity-80 transition-opacity"
      >
        {isOpen ? <X className="size-5" /> : <Menu className="size-5" />}
      </button>

      {isOpen && (
        <nav className="fixed top-14 left-0 right-0 bg-background border-b border-border z-50 md:hidden">
          <div className="flex flex-col py-4 px-4 gap-4">
            {NAV_LINKS.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setIsOpen(false)}
                className="text-foreground hover:text-primary transition-colors py-2"
              >
                {label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </>
  );
}
