import { Product, ProductCategory, Promotions, StockStatus } from "@/lib/types";

async function fetchAPI(endpoint: string) {
  const response = await fetch(`${process.env.STORE_API_URL}${endpoint}`, {
    headers: process.env.API_TOKEN
      ? { "x-vercel-protection-bypass": process.env.API_TOKEN }
      : undefined,
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();

  return data;
}

export async function getProducts(): Promise<Product[]> {
  return fetchAPI(`/products`);
}

export async function getProduct(id: string): Promise<Product> {
  return fetchAPI(`/products/${id}`);
}

export async function getProductCategories(): Promise<ProductCategory[]> {
  return fetchAPI(`/categories`);
}

export async function getStockStatus(id: string): Promise<StockStatus> {
  return fetchAPI(`/products/${id}/stock`);
}

export async function getPromotions(): Promise<Promotions> {
  return fetchAPI(`/promotions`);
}
