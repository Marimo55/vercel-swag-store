import { getPromotions } from "@/lib/api";
import { format } from "date-fns";

export async function PromotionalBanner() {
  let data;
  try {
    const res = await getPromotions();
    data = res.data;
  } catch {
    return null;
  }

  if (!data.active) return null;

  const { title, description, discountPercent, code, validFrom, validUntil } =
    data;

  const from = format(new Date(validFrom), "MMMM d, yyyy");
  const until = format(new Date(validUntil), "MMMM d, yyyy");

  return (
    <div
      className="w-screen relative left-1/2 -translate-x-1/2 bg-black text-white py-8"
      aria-label="Active promotion"
    >
      <div className="max-w-360 mx-auto px-4">
        <p className="text-center">
          <span>
            {title} — {description}{" "}
          </span>
          <span>
            Use code <strong>{code}</strong> to get {discountPercent}% off -
            valid from {from} until {until}.
          </span>
        </p>
      </div>
    </div>
  );
}
