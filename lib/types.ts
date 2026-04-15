export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface Meta {
  pagination: Pagination;
}

export interface ApiResponse<T, M = unknown> {
  success: boolean;
  data: T;
  meta?: M;
}
export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  currency: string;
  category: string;
  images: string[];
  featured: boolean;
  tags: string[];
  createdAt: string;
}

export interface Promotions {
  id: string;
  title: string;
  description: string;
  discountPercent: number;
  code: string;
  validFrom: string;
  validUntil: string;
  active: boolean;
}

export interface StockStatus {
  productId: string;
  stock: number;
  inStock: boolean;
  lowStock: boolean;
}

export interface ProductCategory {
  slug: string;
  name: string;
  productCount: number;
}

export interface CartItem {
  productId: string;
  quantity: number;
  addedAt: string;
  product: Product;
  lineTotal: number;
}

export interface Cart {
  token: string;
  items: CartItem[];
  totalItems: number;
  subtotal: number;
  currency: string;
  createdAt: string;
  updatedAt: string;
}
