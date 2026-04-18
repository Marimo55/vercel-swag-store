"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { updateCartItem, removeCartItem } from "@/lib/cartActions";
import { useCartCount } from "@/lib/cartCountContext";
import { QuantitySelector } from "../quantitySelector";
import { toast } from "sonner";

interface CartItemActionsProps {
  productId: string;
  quantity: number;
}

export function CartItemActions({ productId, quantity }: CartItemActionsProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const { setCartCount } = useCartCount();

  const handleUpdate = (newQty: number) => {
    startTransition(async () => {
      const result = await updateCartItem(productId, newQty);
      if (result.success) {
        setCartCount(result.totalItems);
        router.refresh();
      } else {
        toast.error(result.error);
      }
    });
  };

  const handleRemove = () => {
    startTransition(async () => {
      const result = await removeCartItem(productId);
      if (result.success) {
        setCartCount(result.totalItems);
        toast.success("Item successfully removed from cart");
        router.refresh();
      } else {
        toast.error(result.error);
      }
    });
  };

  return (
    <div className="flex items-center gap-3 mt-auto">
      <QuantitySelector
        quantity={quantity}
        onIncrease={() => handleUpdate(quantity + 1)}
        onDecrease={() => handleUpdate(quantity - 1)}
        disableIncrease={isPending}
        disableDecrease={quantity <= 1 || isPending}
      />
      <Button
        variant="ghost"
        size="icon-lg"
        onClick={handleRemove}
        disabled={isPending}
        className="ml-auto size-8 text-muted-foreground cursor-pointer hover:text-destructive"
      >
        <Trash2 className="size-5" />
      </Button>
    </div>
  );
}
