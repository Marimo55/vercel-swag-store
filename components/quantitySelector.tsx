import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface QuantitySelectorProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  disableIncrease?: boolean;
  disableDecrease?: boolean;
  /** Accessible name for the quantity control group (screen readers). */
  groupLabel?: string;
}

export function QuantitySelector({
  quantity,
  onIncrease,
  onDecrease,
  disableDecrease,
  disableIncrease,
  groupLabel = "Quantity",
}: QuantitySelectorProps) {
  return (
    <div
      className="flex items-center gap-3"
      role="group"
      aria-label={groupLabel}
    >
      <Button
        type="button"
        variant="secondary"
        onClick={onDecrease}
        disabled={disableDecrease}
        aria-label={`Decrease ${groupLabel.toLowerCase()}`}
        className="disabled:opacity-50 cursor-pointer"
      >
        <Minus aria-hidden />
      </Button>
      <span
        className="w-10 text-center tabular-nums"
        aria-live="polite"
        aria-atomic
      >
        {quantity}
      </span>
      <Button
        type="button"
        variant="secondary"
        onClick={onIncrease}
        disabled={disableIncrease}
        aria-label={`Increase ${groupLabel.toLowerCase()}`}
        className="disabled:opacity-50 cursor-pointer"
      >
        <Plus aria-hidden />
      </Button>
    </div>
  );
}
