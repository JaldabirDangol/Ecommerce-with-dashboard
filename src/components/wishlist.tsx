"use client"
import { useWishListStore } from "@/store/wishListStore";
import Link from "next/link";
import { useEffect } from "react";
import { IoIosHeart } from "react-icons/io";
export const Wishlist = ()=>{
   const fetchAndSetWishlist = useWishListStore((state) => state.fetchAndSetWishlist);
    useEffect(() => {
        fetchAndSetWishlist();
    }, [fetchAndSetWishlist]); 
    return(
        <Link href={"/wishlist"} className="rounded-full bg-white ">
            <IoIosHeart className="w-8 h-8 text-red-500"/>
        </Link>
    )
}