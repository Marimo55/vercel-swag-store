import { getCart } from "@/lib/cartActions";
import { CartIcon } from "@/components/cartIcon";

export async function CartItemsCountIcon() {
  const cart = await getCart();
  const count = cart?.totalItems ?? 0;

  return <CartIcon itemsCount={count} />;
}
