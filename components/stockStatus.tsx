import type { StockStatus } from "@/lib/types";
import { CircleCheck, CircleX } from "lucide-react";

interface StockStatusProps {
  inStock: boolean;
}

export default function StockStatus({ inStock }: StockStatusProps) {
  return inStock ? (
    <div className="flex flex-row gap-2 text-emerald-800">
      <CircleCheck />
      <span>In Stock</span>
    </div>
  ) : (
    <div className="flex flex-row gap-2 text-red-800">
      <CircleX />
      <span>Out of Stock</span>
    </div>
  );
}
