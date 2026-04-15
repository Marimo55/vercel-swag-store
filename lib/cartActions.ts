"use server";

import { cookies } from "next/headers";
import type { Cart } from "@/lib/types";
import { API_TOKEN, BASE_URL } from "@/lib/constants";

function apiHeaders(cartToken?: string) {
  return {
    "Content-Type": "application/json",
    ...(API_TOKEN ? { "x-vercel-protection-bypass": API_TOKEN } : {}),
    ...(cartToken ? { "x-cart-token": cartToken } : {}),
  };
}

async function getCartToken() {
  const cookieStore = await cookies();
  const existing = cookieStore.get("cart_token")?.value;
  if (existing) return existing;

  const res = await fetch(`${BASE_URL}/cart/create`, {
    method: "POST",
    headers: apiHeaders(),
  });
  const token = res.headers.get("x-cart-token")!;
  cookieStore.set("cart_token", token, {
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
  return token;
}

export async function getCart(): Promise<Cart | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("cart_token")?.value;
  if (!token) return null;

  const res = await fetch(`${BASE_URL}/cart`, {
    headers: apiHeaders(token),
  });
  if (!res.ok) return null;
  const data = await res.json();
  return data.success ? data.data : null;
}

export async function addToCart(productId: string, quantity: number) {
  const token = await getCartToken();

  const res = await fetch(`${BASE_URL}/cart`, {
    method: "POST",
    headers: apiHeaders(token),
    body: JSON.stringify({ productId, quantity }),
  });
  const data = await res.json();

  return {
    success: data.success ?? false,
    totalItems: data.data?.totalItems ?? 0,
  };
}

export async function updateCartItem(productId: string, quantity: number) {
  const cookieStore = await cookies();
  const token = cookieStore.get("cart_token")?.value;
  if (!token) return { success: false, totalItems: 0 };

  const res = await fetch(`${BASE_URL}/cart/${productId}`, {
    method: "PATCH",
    headers: apiHeaders(token),
    body: JSON.stringify({ quantity }),
  });
  const data = await res.json();

  return {
    success: data.success ?? false,
    totalItems: data.data?.totalItems ?? 0,
  };
}

export async function removeCartItem(productId: string) {
  const cookieStore = await cookies();
  const token = cookieStore.get("cart_token")?.value;
  if (!token) return { success: false, totalItems: 0 };

  const res = await fetch(`${BASE_URL}/cart/${productId}`, {
    method: "DELETE",
    headers: apiHeaders(token),
  });
  const data = await res.json();

  return {
    success: data.success ?? false,
    totalItems: data.data?.totalItems ?? 0,
  };
}
