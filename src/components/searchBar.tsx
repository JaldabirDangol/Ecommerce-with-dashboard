import { Input } from "@/components/ui/input"
import { IoSearchCircleOutline } from "react-icons/io5";


export const SearchBar = ()=>{
    return (
            <div className="relative flex items-center lg:w-xl">
         <Input placeholder="Search products...."/>
          <IoSearchCircleOutline className="absolute right-2 w-8 h-8"/>
            </div>
    )
}
  