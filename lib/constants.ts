export const BASE_URL = process.env.STORE_API_URL!;
export const API_TOKEN = process.env.API_TOKEN;

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Search", href: "/search" },
];

export const PRODUCT_LIST_PAGE_SIZE = 6;

export const SEARCH_RESULTS_LIMIT = 5;
export const SEARCH_DEFAULT_LIMIT = 6;
export const SEARCH_INPUT_DEBOUNCE_MS = 500;

export const EXPIRED_CART_MESSAGE =
  "Your cart session expired. Refresh the page, then try again.";
