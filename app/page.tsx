import { Suspense } from "react";
import { Hero } from "@/components/hero";
import { ProductListing } from "@/components/productListing";
import { Spinner } from "@/components/ui/spinner";
import { PromotionalBanner } from "@/components/promotionalBanner";

interface HomePageProps {
  searchParams: Promise<{
    page?: string;
  }>;
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const params = await searchParams;
  return (
    <>
      <PromotionalBanner />
      <div className="flex flex-col gap-12">
        <Hero />
        <Suspense fallback={<Spinner className="size-10 m-auto" />}>
          <ProductListing searchParams={params} />
        </Suspense>
      </div>
    </>
  );
}
