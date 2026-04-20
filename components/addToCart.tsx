"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { addToCart } from "@/lib/cartActions";
import { useCartCount } from "@/lib/cartCountContext";
import { QuantitySelector } from "@/components/quantitySelector";
import { toast } from "sonner";

interface AddToCartProps {
  productId: string;
  productName: string;
  stock: number;
  inStock: boolean;
}

export default function AddToCart({
  productId,
  productName,
  stock,
  inStock,
}: AddToCartProps) {
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const { setCartCount } = useCartCount();

  const increaseQty = () => {
    if (quantity < stock) setQuantity(quantity + 1);
  };

  const decreaseQty = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleAddToCart = async () => {
    setIsLoading(true);

    const result = await addToCart(productId, quantity);

    if (result.success) {
      setCartCount(result.totalItems);
      toast.success("Item successfully added to cart");
    } else {
      toast.error(result.error);
    }
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col gap-4 items-center sm:items-start">
      {inStock && (
        <QuantitySelector
          quantity={quantity}
          onIncrease={increaseQty}
          onDecrease={decreaseQty}
          disableIncrease={quantity >= stock || isLoading}
          disableDecrease={quantity <= 1 || isLoading}
          groupLabel={`Quantity for ${productName}`}
        />
      )}

      {inStock && (
        <p className="text-sm text-gray-500">
          {stock} item{stock > 1 && "s"} available
        </p>
      )}

      <div>
        <Button
          type="button"
          onClick={handleAddToCart}
          disabled={!inStock || isLoading}
          aria-busy={isLoading}
          aria-label={
            inStock
              ? `Add ${quantity} ${
                  quantity === 1 ? "item" : "items"
                } of ${productName} to cart`
              : undefined
          }
          className="rounded-4xl disabled:opacity-50 cursor-pointer text-2xl px-10 py-6 hover:opacity-90"
        >
          {isLoading ? "Adding..." : inStock ? "Add to Cart" : "Out of Stock"}
        </Button>
      </div>
    </div>
  );
}
