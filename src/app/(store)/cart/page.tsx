import { Metadata } from "next";
import CartPageClient from "./page.client";

export const metadata: Metadata = {
  title: "Cart",
};

const CartPage = () => {
  return <CartPageClient />;
};

export default CartPage;
