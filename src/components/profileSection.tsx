"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  User, 
  Settings, 
  CreditCard, 
  LogOut, 
  ChevronDown,
  Heart,
  ShoppingBag,
  Bell
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSession } from "next-auth/react"
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { Badge } from '@/components/ui/badge';
import { useEffect, useRef, useState } from "react";

export default function ProfilSection() {
   const {data:session} = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef} >
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
       <Button
  variant="ghost"
  className="relative h-10 w-10 md:w-auto rounded-full p-0 flex items-center gap-2"
>
 <Avatar className="h-12 w-12 border">
                  <AvatarImage src={session?.user?.image} alt={session?.user?.name} />
                  <AvatarFallback className="bg-blue-100 text-blue-600 text-lg">
                    {session?.user?.name?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
  <span className="hidden md:inline-block">{session?.user?.name}</span>
  <ChevronDown className="hidden md:inline-block" />
</Button>

        </DropdownMenuTrigger>
        <DropdownMenuContent 
          className="w-64 mt-2 mr-2 p-2" 
          align="end" 
          forceMount
        >
          <DropdownMenuLabel className="font-normal p-4">
            <div className="flex flex-col space-y-1">
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12 border">
                  <AvatarImage src={session?.user?.image} alt={session?.user?.name} />
                  <AvatarFallback className="bg-blue-100 text-blue-600 text-lg">
                    {session?.user?.name?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{session?.user?.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {session?.user?.email}
                  </p>
                </div>
              </div>
              <div className="flex gap-4 pt-3">
                <Button variant="outline" size="sm" className="text-xs h-8 flex-1">
                  <User className="h-3.5 w-3.5 mr-1.5" />
                  Profile
                </Button>
                <Button size="sm" className="text-xs h-8 flex-1">
                  Upgrade
                </Button>
              </div>
            </div>
          </DropdownMenuLabel>
          
          <DropdownMenuSeparator />
          
          <DropdownMenuGroup>
            <DropdownMenuItem className="cursor-pointer p-3 flex items-center">
              <ShoppingBag className="mr-2 h-4 w-4" />
              <span>Orders</span>
              <Badge variant="outline" className="ml-auto">3</Badge>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer p-3 flex items-center">
              <Heart className="mr-2 h-4 w-4" />
              <span>Wishlist</span>
              <Badge variant="outline" className="ml-auto">12</Badge>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer p-3 flex items-center">
              <Bell className="mr-2 h-4 w-4" />
              <span>Notifications</span>
              <Badge variant="destructive" className="ml-auto">5</Badge>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          
          <DropdownMenuSeparator />
          
          <DropdownMenuGroup>
            <DropdownMenuItem className="cursor-pointer p-3">
              <User className="mr-2 h-4 w-4" />
              <span>Account Settings</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer p-3">
              <Settings className="mr-2 h-4 w-4" />
              <span>Preferences</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer p-3">
              <CreditCard className="mr-2 h-4 w-4" />
              <span>Billing</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          
          <DropdownMenuSeparator />
          
          <DropdownMenuItem className="cursor-pointer p-3 text-red-600 focus:text-red-600">
            <LogOut className="mr-2 h-4 w-4" />
            <span>Sign out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}