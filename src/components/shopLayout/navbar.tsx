import Image from "next/image"

import { SearchBar } from "@/components/searchBar";
import { Wishlist } from "@/components/wishlist";
import { Cart } from "@/components/cart";
import {ProfilSection}  from "@/components/profileSection"
export const Navbar = ()=>{

    return(
        <div className="flex  justify-between items-center w-ful py-3 px-4 rounded-3xl bg-gray-300 mt-6 mx-8">
         
         <div className="flex items-center gap-4">
               <Image src="/shopping-logo-design-template-bag-icon-135610427.webp" height={36} width={36} alt="logo" />
             <SearchBar/>
         </div>
        
        <div className="flex items-center gap-4">
             <Cart/>
            <Wishlist/>
            <ProfilSection/>

        </div>

        </div>
    )
}