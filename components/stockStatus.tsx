import { CircleCheck, CircleX } from "lucide-react";

interface StockStatusProps {
  inStock: boolean;
}

export default function StockStatus({ inStock }: StockStatusProps) {
  return inStock ? (
    <div className="flex flex-row gap-2 text-emerald-800">
      <CircleCheck aria-hidden />
      <span>In Stock</span>
    </div>
  ) : (
    <div className="flex flex-row gap-2 text-red-800">
      <CircleX aria-hidden />
      <span>Out of Stock</span>
    </div>
  );
}
