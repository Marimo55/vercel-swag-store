import { getCart } from "@/lib/cartActions";
import { CartIcon } from "@/components/cartIcon";

export async function CartItemsCountIcon() {
  let count = 0;

  try {
    const cart = await getCart();
    count = cart?.totalItems ?? 0;
  } catch (e) {
    if (process.env.NODE_ENV === "development") {
      console.error("[CartItemsCountIcon] getCart failed", e);
    }
  }

  return <CartIcon itemsCount={count} />;
}
