export const SITE_NAME = "Vercel Swag Store";

export const DEFAULT_DESCRIPTION =
  "Developer swag and gear inspired by Vercel—apparel, accessories, tech, and more. Browse featured products, search the catalog, and shop the store.";

export function getSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL;
  if (fromEnv) return fromEnv.replace(/\/+$/, "");
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3000";
}
