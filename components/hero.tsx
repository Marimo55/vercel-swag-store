import Image from "next/image";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section
      id="hero"
      className="flex gap-5 my-10 flex-col-reverse justify-between items-center w-full px-5 md:flex-row md:px-0"
    >
      <div className="flex flex-col gap-6 md:w-1/2 md:max-w-md">
        <h1 className="font-bold text-5xl">
          Wear the framework you ship with.
        </h1>
        <p>
          Premium swag for developers who build with Vercel. From tees to tech
          gear, represent the tools you love.
        </p>

        <div>
          <Link
            className="inline-flex items-center gap-2 rounded-md bg-black px-5 py-3 text-white hover:bg-black/80 transition"
            href="#products"
          >
            <span>Browse All Products</span>
            <ArrowRight />
          </Link>
        </div>
      </div>

      <div className="relative w-full aspect-square overflow-hidden max-h-100 rounded-lg md:w-1/2 ">
        <Image
          className="object-cover object-center"
          src="/hero-1.jpg"
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          alt="hero image"
          priority
        />
      </div>
    </section>
  );
}
