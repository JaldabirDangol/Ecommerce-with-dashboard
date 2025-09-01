"use client";

import { useRouter } from "next/navigation";
import {
  DropdownMenuGroup,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Bell, Heart, ShoppingBag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useWishListStore } from "@/store/wishListStore";
import { useEffect, useState } from "react";
import { getOrderCount } from "@/actions/order";

const ProfileSettings1 = () => {
  const wishlistLength = useWishListStore((state) => state.items.length);
  const [orderLength, setOrderLength] = useState<number>(0);
  const router = useRouter();

  useEffect(() => {
    const fetchOrderCount = async () => {
      const count = await getOrderCount();
      setOrderLength(count);
    };
    fetchOrderCount();
  }, []);

  return (
    <DropdownMenuGroup>
      <DropdownMenuItem
        className="cursor-pointer p-3 flex items-center"
        onClick={() => router.push("/profile?tab=orders")}
      >
        <ShoppingBag className="mr-2 h-4 w-4" />
        <span>Orders</span>
        <Badge variant="outline" className="ml-auto">
          {orderLength ?? 0}
        </Badge>
      </DropdownMenuItem>

      <DropdownMenuItem
        className="cursor-pointer p-3 flex items-center"
        onClick={() => router.push("/profile?tab=wishlist")}
      >
        <Heart className="mr-2 h-4 w-4" />
        <span>Wishlist</span>
        <Badge variant="outline" className="ml-auto">{wishlistLength}</Badge>
      </DropdownMenuItem>

      <DropdownMenuItem
        className="cursor-pointer p-3 flex items-center"
        onClick={() => router.push("/profile?tab=notifications")}
      >
        <Bell className="mr-2 h-4 w-4" />
        <span>Notifications</span>
        <Badge variant="destructive" className="ml-auto">5</Badge>
      </DropdownMenuItem>
    </DropdownMenuGroup>
  );
};

export default ProfileSettings1;
