"use server";

import { cookies } from "next/headers";
import type { Cart, CartMutation } from "@/lib/types";
import { API_TOKEN, BASE_URL, EXPIRED_CART_MESSAGE } from "@/lib/constants";
import { ApiError, isApiError, readApiErrorMessage } from "@/lib/apiErrors";
import { parseJson } from "@/lib/utils";

function apiHeaders(cartToken?: string) {
  return {
    "Content-Type": "application/json",
    ...(API_TOKEN ? { "x-vercel-protection-bypass": API_TOKEN } : {}),
    ...(cartToken ? { "x-cart-token": cartToken } : {}),
  };
}

function setMutationError(error: unknown, fallback: string): CartMutation {
  return {
    success: false,
    totalItems: 0,
    error: error instanceof Error ? error.message : fallback,
  };
}

function isInvalidCartSessionError(error: unknown): boolean {
  if (!isApiError(error)) return false;
  if (error.status === 404 || error.status === 401) return true;
  const msg = error.message.toLowerCase();
  return (
    msg.includes("token") &&
    (msg.includes("not found") ||
      msg.includes("invalid") ||
      msg.includes("expired"))
  );
}

async function clearCartCookie() {
  const cookieStore = await cookies();
  cookieStore.delete("cart_token");
}

async function cartFetch<T>(
  endpoint: string,
  options?: RequestInit,
  token?: string
): Promise<T> {
  let res;

  try {
    res = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        ...apiHeaders(token),
        ...options?.headers,
      },
    });
  } catch {
    throw new ApiError("Network error. Please try again", 0, "Network Error");
  }

  const data = await parseJson(res);

  if (!res.ok) {
    throw new ApiError(
      readApiErrorMessage(data) ?? `Request failed (${res.status})`,
      res.status,
      res.statusText
    );
  }

  if (
    !data ||
    typeof data !== "object" ||
    (data as { success?: boolean }).success !== true
  ) {
    throw new ApiError(
      readApiErrorMessage(data) ?? "Request failed",
      res.status,
      res.statusText
    );
  }

  if (!("data" in data)) {
    throw new ApiError(
      "Invalid response from server",
      res.status,
      res.statusText
    );
  }

  return data.data;
}

async function getCartToken() {
  const cookieStore = await cookies();
  const existing = cookieStore.get("cart_token")?.value;
  if (existing) return existing;

  const cart = await cartFetch<Cart>("/cart/create", { method: "POST" });

  if (!cart.token) {
    throw new ApiError(
      "Could not start a cart session. Please try again.",
      0,
      "Bad Response"
    );
  }

  cookieStore.set("cart_token", cart.token, {
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });

  return cart.token;
}

export async function getCart(): Promise<Cart | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("cart_token")?.value;
  if (!token) return null;

  try {
    return await cartFetch("/cart", { method: "GET" }, token);
  } catch (e) {
    if (isInvalidCartSessionError(e)) {
      // Do not call cookieStore.delete here: getCart runs during RSC render, where
      // cookies are read-only. Stale tokens are cleared in mutation server actions.
      return null;
    }
    throw e;
  }
}

async function postAddToCart(
  productId: string,
  quantity: number,
  token: string
): Promise<CartMutation> {
  const cart = await cartFetch<Cart>(
    "/cart",
    {
      method: "POST",
      body: JSON.stringify({ productId, quantity }),
    },
    token
  );
  return { success: true, totalItems: cart.totalItems };
}

export async function addToCart(
  productId: string,
  quantity: number
): Promise<CartMutation> {
  try {
    const token = await getCartToken();
    try {
      return await postAddToCart(productId, quantity, token);
    } catch (e) {
      if (isInvalidCartSessionError(e)) {
        await clearCartCookie();
        const newToken = await getCartToken();
        return await postAddToCart(productId, quantity, newToken);
      }
      throw e;
    }
  } catch (e) {
    return setMutationError(e, "Unable to add item to cart");
  }
}

export async function updateCartItem(
  productId: string,
  quantity: number
): Promise<CartMutation> {
  const cookieStore = await cookies();
  const token = cookieStore.get("cart_token")?.value;
  if (!token) {
    return { success: false, totalItems: 0, error: "No active cart" };
  }

  try {
    const cart = await cartFetch<Cart>(
      `/cart/${productId}`,
      {
        method: "PATCH",
        body: JSON.stringify({ quantity }),
      },
      token
    );
    return { success: true, totalItems: cart.totalItems };
  } catch (e) {
    if (isInvalidCartSessionError(e)) {
      await clearCartCookie();
      return {
        success: false,
        totalItems: 0,
        error: EXPIRED_CART_MESSAGE,
      };
    }
    return setMutationError(e, "Unable to update cart item");
  }
}

export async function removeCartItem(productId: string): Promise<CartMutation> {
  const cookieStore = await cookies();
  const token = cookieStore.get("cart_token")?.value;
  if (!token) {
    return { success: false, totalItems: 0, error: "No active cart" };
  }

  try {
    const cart = await cartFetch<Cart>(
      `/cart/${productId}`,
      { method: "DELETE" },
      token
    );
    return { success: true, totalItems: cart.totalItems };
  } catch (e) {
    if (isInvalidCartSessionError(e)) {
      await clearCartCookie();
      return {
        success: false,
        totalItems: 0,
        error: EXPIRED_CART_MESSAGE,
      };
    }
    return setMutationError(e, "Unable to remove cart item");
  }
}
