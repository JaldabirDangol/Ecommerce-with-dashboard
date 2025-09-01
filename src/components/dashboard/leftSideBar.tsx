"use client"
import { usePathname } from 'next/navigation'

import {
  DollarSign,
  Home,
  Settings,
  ShoppingCart,
  List,
  Ticket,
} from "lucide-react"
import { IoPerson } from "react-icons/io5"
import Link from 'next/link'


const sideBarItem = [
  { name: 'Dashboard', icons: <Home />, href: '/dashboard' },
  { name: 'Products', icons: <ShoppingCart />, href: '/dashboard/products' },
  { name: 'Category', icons: <List />, href: '/dashboard/category' },
  { name: 'Customers', icons: <IoPerson />, href: '/dashboard/customers' },
  { name: 'Sells', icons: <DollarSign />, href: '/dashboard/sells' },
  { name: 'Coupons', icons: <Ticket />, href: '/dashboard/coupons' },
  { name: 'Settings', icons: <Settings />, href: '/dashboard/setting' },
];

export const LeftSideBar = () => {
  const pathname = usePathname();

  return (
    <div className="w-[15%] p-4 text-gray-300 min-h-screen">
      {sideBarItem.map((item) => {
        // Dashboard matches exact, others match startsWith
        const isActive =
          item.href === "/dashboard"
            ? pathname === "/dashboard"
            : pathname.startsWith(item.href);

        return (
          <Link
            href={item.href}
            key={item.name}
            className={`
              flex items-center p-2 rounded-lg gap-2 text-md transition-colors duration-200 ease-in-out
              ${isActive
                ? 'bg-green-600 text-white font-semibold shadow-md'
                : 'text-gray-600 hover:bg-gray-700 hover:text-white font-medium'
              }
              mb-2
            `}
          >
            <span className="text-xl">{item.icons}</span>
            <span>{item.name}</span>
          </Link>
        );
      })}
    </div>
  );
};
