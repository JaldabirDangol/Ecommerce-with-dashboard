import {
    DropdownMenuGroup,
    DropdownMenuItem
} from '@/components/ui/dropdown-menu';
import {
    Bell,
    Heart,
    ShoppingBag
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import Link from "next/link";
import { useWishListStore } from '@/store/wishListStore';
const ProfileSettings1 = () => {

    const wishlistLength = useWishListStore((state)=>state.items.length)
  return (
        <DropdownMenuGroup>
            <DropdownMenuItem className="cursor-pointer p-3 flex items-center">
              <ShoppingBag className="mr-2 h-4 w-4" />
              <span>Orders</span>
              <Badge variant="outline" className="ml-auto">3</Badge>
            </DropdownMenuItem>
            <Link href={'/wishlist'}>
            <DropdownMenuItem className="cursor-pointer p-3 flex items-center">
              <Heart className="mr-2 h-4 w-4" />
              <span>Wishlist</span>
              <Badge variant="outline" className="ml-auto">{wishlistLength}</Badge>
            </DropdownMenuItem>
            </Link>
            <DropdownMenuItem className="cursor-pointer p-3 flex items-center">
              <Bell className="mr-2 h-4 w-4" />
              <span>Notifications</span>
              <Badge variant="destructive" className="ml-auto">5</Badge>
            </DropdownMenuItem>
          </DropdownMenuGroup>
  )
}

export default ProfileSettings1