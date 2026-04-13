"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";

type Props = {
  stock: number;
  inStock: boolean;
};

export default function AddToCart({ stock, inStock }: Props) {
  const [quantity, setQuantity] = useState(1);

  const increaseQty = () => {
    if (quantity < stock) {
      setQuantity(quantity + 1);
    }
  };

  const decreaseQty = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="flex flex-col gap-4 items-center sm:items-start">
      <div className="flex items-center gap-3">
        <Button
          variant="secondary"
          onClick={decreaseQty}
          disabled={quantity <= 1}
          className="disabled:opacity-50 cursor-pointer"
        >
          <Minus />
        </Button>

        <span className="w-10 text-center">{quantity}</span>

        <Button
          variant="secondary"
          onClick={increaseQty}
          disabled={quantity >= stock}
          className="disabled:opacity-50 cursor-pointer"
        >
          <Plus />
        </Button>
      </div>

      {inStock && (
        <p className="text-sm text-gray-500">
          {stock} item{stock > 1 && "s"} available
        </p>
      )}

      <div>
        <Button
          disabled={!inStock}
          className="rounded-4xl disabled:opacity-50 cursor-pointer text-2xl px-10 py-6 hover:opacity-90"
        >
          {inStock ? "Add to Cart" : "Out of Stock"}
        </Button>
      </div>
    </div>
  );
}
