import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface QuantitySelectorProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  disableIncrease?: boolean;
  disableDecrease?: boolean;
}

export function QuantitySelector({
  quantity,
  onIncrease,
  onDecrease,
  disableDecrease,
  disableIncrease,
}: QuantitySelectorProps) {
  return (
    <div className="flex items-center gap-3">
      <Button
        variant="secondary"
        onClick={onDecrease}
        disabled={disableDecrease}
        className="disabled:opacity-50 cursor-pointer"
      >
        <Minus />
      </Button>
      <span className="w-10 text-center">{quantity}</span>
      <Button
        variant="secondary"
        onClick={onIncrease}
        disabled={disableIncrease}
        className="disabled:opacity-50 cursor-pointer"
      >
        <Plus />
      </Button>
    </div>
  );
}
