"use client";

import { useCartStore } from "@/store/cartStore";
import Link from "next/link";
import { CiShoppingCart } from "react-icons/ci";

export const Cart = () => {
  const cartCount = useCartStore((state) =>
  state.items.reduce((acc, item) => acc + item.quantity, 0)
);


  return (
    <Link href={"/cart"} className="rounded-full bg-white flex relative">
      <CiShoppingCart className="w-8 h-8" />
      <span className="absolute -right-1 -top-2 text-red-500">
        {cartCount > 0 ? cartCount : 0}
      </span>
    </Link>
  );
};