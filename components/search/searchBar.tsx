"use client";

import { useCallback, useEffect, useState, useTransition } from "react";
import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
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
}

function buildSearchURL(pathname: string, query: string, categorySlug: string) {
  const params = new URLSearchParams();
  const trimmedQuery = query.trim();

  if (trimmedQuery) params.set("q", trimmedQuery);
  if (categorySlug) params.set("category", categorySlug);

  const queryStr = params.toString();
  return queryStr ? `${pathname}?${queryStr}` : pathname;
}

function matchesCurrentUrl(
  pathname: string,
  searchParams: ReturnType<typeof useSearchParams>,
  url: string
) {
  const query = url.indexOf("?");
  const path = query === -1 ? url : url.slice(0, query);
  const queryStr = query === -1 ? "" : url.slice(query + 1);

  if (path !== pathname) return false;
  const target = new URLSearchParams(queryStr);

  if (
    Array.from(searchParams.entries()).length !==
    Array.from(target.entries()).length
  )
    return false;

  for (const key of target.keys()) {
    if (searchParams.get(key) !== target.get(key)) return false;
  }
  return true;
}

export function SearchBar({ categories }: SearchFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const queryFromUrl = searchParams.get("q") ?? "";
  const categoryFromUrl = searchParams.get("category") ?? "";

  const [inputValue, setInputValue] = useState(queryFromUrl);
  const debouncedQuery = useDebounce(inputValue);

  const navigateTo = useCallback(
    (url: string) => {
      if (matchesCurrentUrl(pathname, searchParams, url)) return;
      startTransition(() => {
        router.push(url, { scroll: false });
      });
    },
    [router, pathname, searchParams]
  );

  const onCategoryChange = useCallback(
    (categorySlug: string) => {
      navigateTo(buildSearchURL(pathname, inputValue.trim(), categorySlug));
    },
    [inputValue, pathname, navigateTo]
  );

  const submitSearch = useCallback(() => {
    navigateTo(buildSearchURL(pathname, inputValue.trim(), categoryFromUrl));
  }, [inputValue, categoryFromUrl, pathname, navigateTo]);

  useEffect(() => {
    setInputValue(queryFromUrl);
  }, [queryFromUrl]);

  useEffect(() => {
    const trimmedQuery = debouncedQuery.trim();
    if (trimmedQuery.length < 3) return;

    const url = buildSearchURL(pathname, trimmedQuery, categoryFromUrl);
    const currentUrl = buildSearchURL(pathname, queryFromUrl, categoryFromUrl);
    if (url !== currentUrl) navigateTo(url);
  }, [debouncedQuery, pathname, queryFromUrl, categoryFromUrl, navigateTo]);

  return (
    <div className="flex flex-col gap-6 w-full max-w-5xl m-auto py-10">
      <InputGroup className="h-12 w-full">
        <InputGroupAddon align="inline-start">
          <Search className="text-muted-foreground" />
        </InputGroupAddon>
        <InputGroupInput
          id="product-search"
          type="search"
          placeholder="Search products…"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
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
          value={categoryFromUrl}
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
