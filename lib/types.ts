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
