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
  const [notificationCount, setNotificationCount] = useState<number>(0);
  const router = useRouter();

  useEffect(() => {
    const fetchOrderCount = async () => {
      const count = await getOrderCount();
      setOrderLength(count);
    };
    fetchOrderCount();
  }, []);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await fetch("/api/notifications"); 
        const data = await res.json();
        const unreadCount = data.filter((n: any) => !n.isRead).length;
        setNotificationCount(unreadCount);
      } catch (err) {
        console.error("Failed to fetch notifications:", err);
      }
    };
    fetchNotifications();
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
        <Badge variant={notificationCount > 0 ? "destructive" : "outline"} className="ml-auto">
          {notificationCount}
        </Badge>
      </DropdownMenuItem>
    </DropdownMenuGroup>
  );
};

export default ProfileSettings1;
