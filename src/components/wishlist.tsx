"use client"
import { useWishListStore } from "@/store/wishListStore";
import Link from "next/link";
import { useEffect } from "react";
import { IoIosHeart } from "react-icons/io";
export const Wishlist = ()=>{
   const fetchAndSetWishlist = useWishListStore((state) => state.fetchAndSetWishlist);
   const wishlistCount = useWishListStore((state) => state.items.length);
    useEffect(() => {
        fetchAndSetWishlist();
    }, [fetchAndSetWishlist]); 
    return(
        <Link href={"/wishlist"} className="rounded-full bg-white relative flex">
            <IoIosHeart className="w-8 h-8 text-red-500"/>
            {wishlistCount > 0 && (
              <span className="absolute -right-1 -top-2 text-red-500 text-sm font-semibold">
                {wishlistCount}
              </span>
            )}
        </Link>
    )
}