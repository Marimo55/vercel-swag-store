import { Suspense } from "react";
import { Hero } from "@/components/hero";
import { ProductListing } from "@/components/productListing";
import { Spinner } from "@/components/ui/spinner";

interface HomeProps {
  searchParams?: {
    page?: string;
  };
}

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams;
  return (
    <div className="flex flex-col gap-12">
      <Hero />
      <Suspense fallback={<Spinner className="size-10 m-auto" />}>
        <ProductListing searchParams={params} />
      </Suspense>
    </div>
  );
}
