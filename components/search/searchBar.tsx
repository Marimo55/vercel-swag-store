"use client";

import { useCallback, useEffect, useState, useTransition } from "react";
import { Search } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDebounce } from "@/hooks/useDebounce";
import type { ProductCategory } from "@/lib/types";

interface SearchFiltersProps {
  categories: ProductCategory[];
  initialQuery: string;
  initialCategory: string;
}

function buildSearchURL(pathname: string, query: string, categorySlug: string) {
  const params = new URLSearchParams();
  const trimmedQuery = query.trim();

  if (trimmedQuery) params.set("q", trimmedQuery);
  if (categorySlug) params.set("category", categorySlug);

  const queryStr = params.toString();
  return queryStr ? `${pathname}?${queryStr}` : pathname;
}

export function SearchBar({
  categories,
  initialQuery,
  initialCategory,
}: SearchFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [inputValue, setInputValue] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const debouncedQuery = useDebounce(inputValue);

  useEffect(() => {
    setInputValue(initialQuery);
  }, [initialQuery]);

  useEffect(() => {
    setSelectedCategory(initialCategory);
  }, [initialCategory]);

  const navigateTo = useCallback(
    (url: string) => {
      startTransition(() => {
        router.push(url, { scroll: false });
      });
    },
    [router]
  );

  const onCategoryChange = useCallback(
    (categorySlug: string) => {
      setSelectedCategory(categorySlug);
      navigateTo(buildSearchURL(pathname, inputValue.trim(), categorySlug));
    },
    [inputValue, pathname, navigateTo]
  );

  const submitSearch = useCallback(() => {
    navigateTo(buildSearchURL(pathname, inputValue.trim(), selectedCategory));
  }, [inputValue, selectedCategory, pathname, navigateTo]);

  useEffect(() => {
    const trimmedQuery = debouncedQuery.trim();
    if (trimmedQuery.length >= 3) {
      navigateTo(buildSearchURL(pathname, trimmedQuery, selectedCategory));
    }
  }, [debouncedQuery, pathname, selectedCategory, navigateTo]);

  return (
    <div className="flex flex-col gap-6 w-full max-w-5xl m-auto py-10">
      <InputGroup className="h-12 w-full">
        <InputGroupAddon align="inline-start">
          <Search className="text-muted-foreground" aria-hidden />
        </InputGroupAddon>
        <InputGroupInput
          id="product-search"
          type="search"
          placeholder="Search products…"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          disabled={isPending}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              submitSearch();
            }
          }}
          autoComplete="off"
          required
        />
        <InputGroupAddon align="inline-end" className="pr-1">
          <Button
            type="button"
            className="cursor-pointer h-12 px-5 rounded-bl-none rounded-tl-none"
            onClick={submitSearch}
            disabled={isPending}
          >
            Search
          </Button>
        </InputGroupAddon>
      </InputGroup>

      <div className="flex flex-col gap-2 w-full lg:w-56">
        <label htmlFor="category-filter" className="text-sm font-medium">
          Search by Category
        </label>
        <Select
          value={selectedCategory}
          onValueChange={(value) => onCategoryChange(value ?? "")}
          disabled={isPending}
        >
          <SelectTrigger id="category-filter" className="h-12 w-full">
            <SelectValue placeholder="All categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="">All categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category.slug} value={category.slug}>
                  {category.name} ({category.productCount})
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
