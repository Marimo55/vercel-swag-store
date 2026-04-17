import { Suspense } from "react";
import { Hero } from "@/components/hero";
import { ProductListing } from "@/components/productListing";
import { Spinner } from "@/components/ui/spinner";
import { PromotionalBanner } from "@/components/promotionalBanner";
import { Skeleton } from "@/components/ui/skeleton";

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
