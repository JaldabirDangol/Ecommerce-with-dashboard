"use client"

import { Heart, Trash } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import { MdOutlineCheckBox } from "react-icons/md";
import { toast } from "sonner";

export const CartItem = ({item}:any)=>{
  const [ticked , setTicked] = useState(false);

  const deleteCartItemHandler= async()=>{
       try {
      const res = await fetch('/api/cart',{
        method:"DELETE",
        body:JSON.stringify({cartItemId:item.id}),
      })

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to delete item from cart');
      }

      const data = await res.json();
      toast(data.message)
      
       } catch (error) {
         console.log(error)
         
       }
  }

    return (

        <div className="flex w-full items-center gap-4 bg-main-200 p-4  rounded-2xl">
            {
                ticked ?  <MdOutlineCheckBox onClick={()=>setTicked(!ticked)} className="w-8 h-8" /> :  <MdOutlineCheckBoxOutlineBlank onClick={()=>setTicked(!ticked)} className="w-8 h-8" />
            }
            
          <div className=" h-16 ">
              <Image src={item.product.images[0]} height={100} width={100} alt={"product"}
              className="object-contain" />
          </div>
         
         <div className="flex flex-col w-[70%]">
            <h2>{ item.product.name}</h2>
            <p className="w-full line-clamp-3">{item.product.description}</p>
         </div>
   
   <div className="flex flex-col gap-2">

    <h2>{item.product.price}</h2>
     
  <div className="flex gap-2">
  {/* Wishlist Button */}
  <button
    className="p-2 rounded-full border hover:bg-red-100 transition"
    title="Add to Wishlist"
  >
    <Heart className="w-5 h-5 text-red-500" />
  </button>

  {/* Delete Button */}
  <button
    className="p-2 rounded-full border hover:bg-gray-200 transition"
    title="Delete Product"
    onClick={deleteCartItemHandler}
  >
    <Trash className="w-5 h-5 text-gray-600" />
  </button>
</div>
   </div>

 <div>
                <h2 className="text-lg font-semibold text-gray-800 mb-2">Quantity</h2>
              <div className="flex items-center gap-3">
                <button
                  className="bg-gray-200 text-gray-800 text-xl font-bold w-10 h-10 rounded-lg flex items-center justify-center hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Decrease quantity"
                
                >
                  -
                </button>
                <input
                  type="number"
                  value={item.quantity} 
                  min="1"
                  className="w-16 text-center text-xl font-semibold border border-gray-300 rounded-lg py-1 px-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  aria-label="Product quantity"
               
                />
                <button
                  className="bg-gray-200 text-gray-800 text-xl font-bold w-10 h-10 rounded-lg flex items-center justify-center hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
            </div>

        </div>
    )
}