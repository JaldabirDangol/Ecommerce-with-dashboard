"use client";

import { deleteCartItem, updateCartItem } from "@/actions/cart";
import { useCartStore } from "@/store/cartStore";
import { Heart, Trash } from "lucide-react";
import Image from "next/image";
import { useTransition } from "react";
import { MdOutlineCheckBoxOutlineBlank, MdOutlineCheckBox } from "react-icons/md";
import { toast } from "sonner";
import ProductDescription from "./productDescription";

interface CartItemProps {
  productId: string;
  cartItemId:string
}

export const CartItem = ({ productId ,cartItemId}: CartItemProps) => {
  const { items, toggleSelected, removeFromCart, updateQuantity } = useCartStore();
  const [isPending, startTransition] = useTransition();

  const item = items.find((i) => i.productId === productId);

  if (!item) {
    return null;
  }
  
  const deleteCartItemHandler = async () => {
    startTransition(async () => {
      try {
        const res = await deleteCartItem(cartItemId);
        toast(res.message);
        removeFromCart(item.productId);
      } catch (error) {
        console.error("Failed to delete cart item:", error);
      }
    });
  };

  const handleQuantityChange = (delta: number) => {
    const newQty = item.quantity + delta;
    if (newQty < 1) return;
    updateQuantity(item.productId, newQty);
    startTransition(async () => {
      try {
        await updateCartItem({ productId: item.productId, quantity: newQty });
      } catch {
        // Revert on failure
        updateQuantity(item.productId, item.quantity);
      }
    });
  };
  
  return (
    <div className="flex w-full items-center gap-4 bg-main-200 p-4 rounded-2xl">
      {item.isSelected ? (
        <MdOutlineCheckBox
          onClick={() => toggleSelected(item.productId)}
          className="w-8 h-8 cursor-pointer"
        />
      ) : (
        <MdOutlineCheckBoxOutlineBlank
          onClick={() => toggleSelected(item.productId)}
          className="w-8 h-8 cursor-pointer"
        />
      )}

      <div className="h-16 overflow-hidden">
        <Image
          src={item?.image ?? "/public/earbud.jpg"}
          height={100}
          width={100}
          alt={"product"}
          className="object-contain"
        />
      </div>

      <div className="flex flex-col w-[70%]">
        <h2 className="text-md font-semibold">{item.productName}</h2>
        <ProductDescription
          description={item.description ?? ""}
          maxLength={150}
        />
      </div>

      <div className="flex flex-col gap-2">
        <h2 className="font-semibold text-gray-800">Rs. {item.price}</h2>
        <div className="flex gap-2">
          <button className="p-2 rounded-full border hover:bg-red-100 transition" title="Add to Wishlist">
            <Heart className="w-5 h-5 text-red-500" />
          </button>
          <button
            className="p-2 rounded-full border hover:bg-gray-200 transition"
            title="Delete Product"
            onClick={deleteCartItemHandler}
            disabled={isPending}
          >
            {isPending ? (
              <div className="spinner"></div>
            ) : (
              <Trash className="w-5 h-5 text-gray-600" />
            )}
          </button>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-gray-800 mb-2">Quantity</h2>
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleQuantityChange(-1)}
            disabled={item.quantity <= 1 || isPending}
            className="bg-gray-200 text-gray-800 text-xl font-bold w-10 h-10 rounded-lg flex items-center justify-center hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Decrease quantity"
          >
            -
          </button>
          <input
            type="number"
            value={item.quantity}
            onChange={(e) => {
              const newQuantity = parseInt(e.target.value);
              if (!isNaN(newQuantity) && newQuantity >= 1) {
                updateQuantity(item.productId, newQuantity);
                startTransition(async () => {
                  try {
                    await updateCartItem({ productId: item.productId, quantity: newQuantity });
                  } catch {
                    updateQuantity(item.productId, item.quantity);
                  }
                });
              }
            }}
            min="1"
            className="w-16 text-center text-xl font-semibold border border-gray-300 rounded-lg py-1 px-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Product quantity"
          />
          <button
            onClick={() => handleQuantityChange(1)}
            disabled={isPending}
            className="bg-gray-200 text-gray-800 text-xl font-bold w-10 h-10 rounded-lg flex items-center justify-center hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};