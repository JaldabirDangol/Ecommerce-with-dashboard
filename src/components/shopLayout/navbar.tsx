import Image from "next/image"

import { SearchBar } from "@/components/searchBar";
import { Wishlist } from "@/components/wishlist";
import { Cart } from "@/components/cart";
import {ProfilSection}  from "@/components/profileSection"
import { NavMenu } from "@/components/navItems";
import Link from "next/link";
export const Navbar = ()=>{

    return(
        <header className="flex  justify-between items-center w-full py-3 px-4 rounded-3xl bg-main-400 ">
         
         <div className="flex items-center gap-4">
            <Link href="/" className="hover:cursor-pointer">
               <Image src="/shopping-logo-design-template-bag-icon-135610427.webp" height={36} width={36} alt="logo" />
            </Link>
             <SearchBar/>
         </div>
<NavMenu/>
        
        <div className="flex items-center gap-4">
             <Cart/>
            <Wishlist/>
            <ProfilSection/>

        </div>

        </header>
    )
}