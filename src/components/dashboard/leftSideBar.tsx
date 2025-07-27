"use client"

import {
  DollarSign,
  Home,
  Settings,
  ShoppingCart, 
  List,         
  Ticket,       
  Package      
} from "lucide-react" 
import { IoPerson } from "react-icons/io5" 

const sideBarItem = [
  { name: 'Dashboard', icons: <Home /> },
  { name: 'Products', icons: <ShoppingCart /> }, 
  { name: 'Category', icons: <List /> },      
  { name: 'Customers', icons: <IoPerson /> },
  { name: 'Sells', icons: <DollarSign /> },
  { name: 'Coupons', icons: <Ticket /> },     
  { name: 'Settings', icons: <Settings /> },
]

export const LeftSideBar = () => {
  return (
    <div className="w-[15%]  p-4">
     
    
    {sideBarItem.map((item)=>(
      <div key={item.name} className="hover:bg-green-500 font-semibold text-gray-500
      rounded-2xl hover:text-white flex items-center hover:cursor-pointer p-2
      gap-2">

        {item.icons}  {item.name}
    
      </div>
    ))
    
    
    }</div>
  )
}
