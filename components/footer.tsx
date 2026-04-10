import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-border bg-muted/30">
      <div className="mx-auto flex flex-col items-center justify-center max-w-360 px-4 py-8 sm:px-6 lg:px-8 sm:justify-between sm:flex-row">
        <div className="text-sm text-muted-foreground">
          &copy; {currentYear} Vercel Swag Store. All rights reserved.
        </div>

        <hr className="sm:hidden bg-border w-20 my-4" />

        <ul className="flex flex-col items-center flex-wrap justify-center gap-4 sm:gap-0 sm:divide-x divide-border sm:flex-row text-sm">
          <li className="sm:px-3">
            <Link
              href="/privacy"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Privacy Policy
            </Link>
          </li>
          <li className="sm:px-3">
            <Link
              href="/terms"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Terms & Conditions
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}
