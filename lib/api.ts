import {
  ApiResponse,
  Meta,
  Product,
  ProductCategory,
  Promotions,
  StockStatus,
} from "@/lib/types";
import { API_TOKEN, BASE_URL } from "@/lib/constants";

async function fetchAPI(endpoint: string) {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    headers: API_TOKEN
      ? { "x-vercel-protection-bypass": API_TOKEN }
      : undefined,
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();

  return data;
}

export async function getProducts(params?: {
  page?: number;
  limit?: number;
  category?: string;
  search?: string;
  featured?: boolean;
}): Promise<ApiResponse<Product[], Meta>> {
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

export async function getProduct(id: string): Promise<ApiResponse<Product>> {
  return fetchAPI(`/products/${id}`);
}

export async function getProductCategories(): Promise<
  ApiResponse<ProductCategory[]>
> {
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
