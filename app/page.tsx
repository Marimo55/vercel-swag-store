import { Suspense } from "react";
import { Hero } from "@/components/hero";
import { ProductListing } from "@/components/productListing";
import { Spinner } from "@/components/ui/spinner";
import { PromotionalBanner } from "@/components/promotionalBanner";
import { Skeleton } from "@/components/ui/skeleton";
import { SITE_NAME } from "@/lib/site";

export const metadata = {
  title: { absolute: SITE_NAME },
  description:
    "Wear the framework you ship with. Featured products, promotions, and the full Vercel Swag Store catalog.",
  openGraph: {
    title: SITE_NAME,
    description:
      "Wear the framework you ship with. Featured products, promotions, and the full Vercel Swag Store catalog.",
    url: "/",
    images: [{ url: "/hero-1.jpg", width: 1200, height: 1200, alt: SITE_NAME }],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description:
      "Wear the framework you ship with. Featured products, promotions, and the full Vercel Swag Store catalog.",
    images: ["/hero-1.jpg"],
  },
};

interface HomePageProps {
  searchParams: Promise<{
    page?: string;
  }>;
}

export default function HomePage({ searchParams }: HomePageProps) {
  return (
    <>
      <Suspense
        fallback={
          <Skeleton className="w-screen relative left-1/2 -translate-x-1/2 min-h-22" />
        }
      >
        <PromotionalBanner />
      </Suspense>
      <div className="flex flex-col gap-12">
        <Hero />
        <Suspense fallback={<Spinner className="size-10 m-auto" />}>
          <ProductListing searchParams={searchParams} />
        </Suspense>
      </div>
    </>
  );
}
