import Link from "next/link";
import { IoIosHeart } from "react-icons/io";
export const Wishlist = ()=>{
    return(
        <Link href={"/wishlist"} className="rounded-full bg-white">

            <IoIosHeart className="w-8 h-8 text-red-500"/>
        </Link>
    )
}