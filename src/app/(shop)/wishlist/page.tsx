"use client";

import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useWishListStore } from "@/store/wishListStore"; 
import { CartItem, WishlistItem } from "@/types/product";
import { XCircleIcon } from "@heroicons/react/24/outline";
import { useCartStore } from "@/store/cartStore";
import { updateCartItem } from "@/actions/cart";
import { toast } from "sonner";

const WishlistPage = () => {
  const { items, removeFromWishList, fetchAndSetWishlist } = useWishListStore();

  console.log(items,"fagsagfsdf")
  const addToCart = useCartStore((state) => state.addToCart);

  useEffect(() => {
    fetchAndSetWishlist(); 
  }, [fetchAndSetWishlist]);

  const handleRemoveItem = (itemId: string) => {
    removeFromWishList(itemId);
  };

  const moveToCart = async (item: WishlistItem) => {
    const cartItem: CartItem = {
      productId: item.id,
      productName: item.name,
      quantity: 1,
      price: item.price,
      description: item.description || "",
    };

    const result = await updateCartItem({
      productId: item.id,
      quantity: 1,
    });

    if (result.success) {
      toast(result.message); 
      addToCart(cartItem);
      removeFromWishList(item.id);
    }
  };

  const handleMoveAllToCart = async () => {
    for (const item of items) {
      const cartItem: CartItem = {
        productId: item.id,
        productName: item.name,
        quantity: 1,
        price: item.price,
        description: item.description || "",
      };

      const result = await updateCartItem({
        productId: item.id,
        quantity: 1,
      });

      if (result.success) {
        addToCart(cartItem);
      }
    }

    items.forEach((item) => removeFromWishList(item.id));
  };

  return (
    <div className="flex w-full h-full p-6 gap-6">
      <div className="flex flex-col flex-1 gap-4">
        <h1 className="text-2xl font-semibold mb-4">My Wishlist</h1>
        {items.length === 0 ? (
          <p className="text-gray-500">Your wishlist is empty.</p>
        ) : (
          items.map((item: WishlistItem) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-4 bg-white rounded-2xl shadow-sm gap-1"
            >
              <div className="flex items-center gap-4">
                <Image
                  src={item?.image}
                  alt={item.name}
                  width={100}
                  height={100}
                  className="rounded-xl w-20 h-20 object-cover"
                />
                <div>
                  <h2 className="font-medium">{item.name}</h2>
              <p className="text-sm text-gray-500">
  { item.description && item?.description?.length > 200
    ? item.description.slice(0, 200) + "..."
    : item.description}
</p>
                  <p className="text-red-500 font-semibold">${item.price}</p>
                  <p className="text-xs text-gray-400">
                    Added on{" "}
                    {new Date(item.dateAdded).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button variant="outline" className="rounded-xl" onClick={() => moveToCart(item)}>
                  Move to Cart
                </Button>
                <Button
                  variant="destructive"
                  className="rounded-xl flex items-center gap-1"
                  onClick={() => handleRemoveItem(item.id)}
                >
                  <XCircleIcon className="h-4 w-4" /> Remove
                </Button>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="w-[300px] h-fit bg-white rounded-2xl shadow-md p-4">
        <h2 className="text-xl font-semibold mb-4">Summary</h2>
        <p className="text-gray-600">
          Total items: <span className="font-semibold">{items.length}</span>
        </p>
        <p className="text-gray-600">
          Estimated total: <span className="font-semibold text-red-500">
            ${items.reduce((acc, item) => acc + item.price, 0)}
          </span>
        </p>
        <Button
          className="w-full mt-4 rounded-xl"
          onClick={handleMoveAllToCart}
          disabled={items.length === 0}
        >
          Move All to Cart
        </Button>
      </div>
    </div>
  );
};

export default WishlistPage;
