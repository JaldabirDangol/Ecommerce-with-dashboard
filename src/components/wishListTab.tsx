"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useWishListStore } from "@/store/wishListStore";
import { Heart, X } from "lucide-react";
import Link from "next/link";

export const WishListTab = () => {
  const items = useWishListStore((state) => state.items);
  const removeItem = useWishListStore((state) => state.removeFromWishList);

  if (!items || items.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart size={18} /> Wishlist
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">Your wishlist is empty.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Heart size={18} /> Wishlist
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {items.map((item, index) => (
            <div key={item.id}>
              <li className="flex items-center justify-between p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md transition-colors duration-200">
                <span className="font-medium text-gray-800 dark:text-gray-200">
                  {item.name}
                </span>
                <div className="flex items-center gap-2">
                  <Button asChild size="sm" variant="outline">
                    <Link href={`/products/${item.id}`}>View</Link>
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-red-500 hover:bg-red-50 hover:text-red-600"
                    onClick={() => removeItem(item.id)}
                  >
                    <X size={16} />
                  </Button>
                </div>
              </li>
              {index < items.length - 1 && <hr className="my-2 border-t border-gray-200 dark:border-gray-700" />}
            </div>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};