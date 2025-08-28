"use client";

import React from 'react';
import { HeartIcon as HeartIconOutline } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import { Button } from '@/components/ui/button';
import { useWishListStore } from '@/store/wishListStore';
import { WishlistItem } from '@/types/product';
import { toast } from 'sonner';

interface WishlistButtonProps {
  product: WishlistItem;
}

const WishlistButton: React.FC<WishlistButtonProps> = ({ product }) => {
  const { items, addToWishList, removeFromWishList } = useWishListStore();

  const isWishlisted = items.some(item => item.id === product.id);
const handleToggleWishlist = async () => {
  try {
    const res = await fetch("/api/wishlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId: product.id }),
    });

    const data: { success: boolean; message?: string; error?: string } = await res.json();

    if (!res.ok) {
      toast.error(data.error || "Failed to update wishlist");
      return;
    }

    if (isWishlisted) {
      removeFromWishList(product.id);
    } else {
      addToWishList(product);
    }

    toast.success(data.message || "Wishlist updated");
  } catch (error) {
    toast.error("Network error. Please try again.");
  }
};



  return (
    <Button
      variant="secondary"
      onClick={handleToggleWishlist}
      aria-label={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
      className="p-3 bg-white hover:bg-gray-100 transition-colors border-2 border-gray-300 rounded-lg shadow-sm w-full"
    >
      {isWishlisted ? (
        <HeartIconSolid className="h-6 w-6 text-red-500" />
      ) : (
        <HeartIconOutline className="h-6 w-6 text-gray-500" />
      )}
    </Button>
  );
};

export default WishlistButton;