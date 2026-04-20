import {
  ApiResponse,
  Meta,
  Product,
  ProductCategory,
  Promotions,
  StockStatus,
} from "@/lib/types";
import { API_TOKEN, BASE_URL, PRODUCT_LIST_PAGE_SIZE } from "@/lib/constants";
import { cacheLife, cacheTag } from "next/cache";
import { ApiError, readApiErrorMessage } from "@/lib/apiErrors";
import { parseJson } from "@/lib/utils";

async function fetchAPI<T>(endpoint: string): Promise<T> {
  let response: Response;

  try {
    response = await fetch(`${BASE_URL}${endpoint}`, {
      headers: API_TOKEN
        ? { "x-vercel-protection-bypass": API_TOKEN }
        : undefined,
    });
  } catch {
    throw new ApiError(
      "Unable to reach the store API. Check your connection and try again",
      0,
      "Network Error"
    );
  }

  const payload = await parseJson(response);

  if (!response.ok) {
    throw new ApiError(
      readApiErrorMessage(payload) ?? `Request failed (${response.status})`,
      response.status,
      response.statusText
    );
  }

  if (
    !payload ||
    typeof payload !== "object" ||
    !("success" in payload) ||
    payload.success !== true
  ) {
    throw new ApiError(
      readApiErrorMessage(payload) ??
        "The store could not complete this request",
      response.status,
      response.statusText
    );
  }

  if (!("data" in payload)) {
    throw new ApiError(
      "Invalid response from server",
      response.status,
      response.statusText
    );
  }

  return payload;
}

export async function getProducts(params?: {
  page?: number;
  limit?: number;
  category?: string;
  search?: string;
  featured?: boolean;
}): Promise<ApiResponse<Product[], Meta>> {
  "use cache";
  cacheLife("hours");
  cacheTag("products");

  if (params?.category) {
    cacheTag(`category:${params.category}`);
  }
  if (params?.featured) {
    cacheTag("products:featured");
  }

  const searchParams = new URLSearchParams();
  if (params?.page) searchParams.set("page", params.page.toString());
  if (params?.limit) searchParams.set("limit", params.limit.toString());
  if (params?.category) searchParams.set("category", params.category);
  if (params?.search) searchParams.set("search", params.search);
  if (params?.featured) searchParams.set("featured", String(params.featured));

  const query = searchParams.toString();
  const endpoint = query ? `/products?${query}` : "/products";
  return fetchAPI(endpoint);
}

export async function getAllProducts(): Promise<Product[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("products");

  const allProducts = [];
  let page = 1;
  let hasNextPage = true;

  while (hasNextPage) {
    const response = await fetchAPI<ApiResponse<Product[], Meta>>(
      `/products?page=${page}&limit=${PRODUCT_LIST_PAGE_SIZE}`
    );
    allProducts.push(...response.data);
    hasNextPage = response.meta?.pagination?.hasNextPage ?? false;
    page += 1;
  }

  return allProducts;
}

export async function getProduct(id: string): Promise<ApiResponse<Product>> {
  "use cache";
  cacheLife("hours");
  cacheTag("products", `product:${id}`);
  return fetchAPI(`/products/${id}`);
}

export async function getProductCategories(): Promise<
  ApiResponse<ProductCategory[]>
> {
  "use cache";
  cacheLife("hours");
  cacheTag("categories");
  return fetchAPI(`/categories`);
}

export async function getStockStatus(
  id: string
): Promise<ApiResponse<StockStatus>> {
  return fetchAPI(`/products/${id}/stock`);
}

export async function getPromotions(): Promise<ApiResponse<Promotions>> {
  return fetchAPI(`/promotions`);
}
