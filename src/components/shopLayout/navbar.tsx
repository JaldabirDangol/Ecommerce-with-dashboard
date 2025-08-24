"use client"
import Image from "next/image"
import { SearchBar } from "@/components/searchBar";
import { Wishlist } from "@/components/wishlist";
import { Cart } from "@/components/cart";
import ProfileSection from "@/components/profileSection"
import { NavMenu } from "@/components/navItems";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Navbar = () => {
  const pathname = usePathname();
  
  if (pathname.startsWith("/dashboard")) {
    return null;
  }

  return (
    <header className="flex justify-between items-center w-full py-3 px-8 gap-8 rounded-3xl bg-white shadow-md">

      <div className="flex items-center gap-6 flex-1">
        <Link href="/" className="hover:cursor-pointer shrink-0">
          <Image 
            src="/shopping-logo-design-template-bag-icon-135610427.webp" 
            height={36} 
            width={36} 
            alt="logo" 
            className="rounded-lg"
          />
        </Link>
        <div className="flex-1 max-w-xl">
          <SearchBar />
        </div>
      </div>

      <div className="hidden lg:flex mx-6">
        <NavMenu />
      </div>

     <div className="flex items-center gap-6 justify-end flex-1">
  <Cart  />
  <Wishlist  />
  <ProfileSection />
</div>
    </header>
  )
}