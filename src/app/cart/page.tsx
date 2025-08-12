import { CartItem } from "@/components/cartItem"
import { Trash } from "lucide-react";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import { prisma } from "@/lib/db";
import {auth} from "@/app/auth"
import { NextResponse } from "next/server";


const cartFetcher = async()=>{
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Not Authenticated" }, { status: 401 });
  }
 const userId = session.user.id;
  const userWithCart = await prisma.user.findUnique({
    where:{id:userId},
    include:{cartItem:{include:{items:true}}}
  })

  return NextResponse.json(userWithCart?.cartItem?.items || []);
}
const sampleProduct = {
  id: "prod_mac001",
  name: 'MacBook Pro 14" M3',
  description:
    "Experience unparalleled performance with the Apple M3 chip, featuring an 8-core CPU and 10-core GPU. Boasting 16GB RAM and a lightning-fast 512GB SSD, all showcased on a stunning Liquid Retina XDR display.",
  price: 1999.99,
  images: [ // Changed 'image' to 'images' to hold multiple image paths
    "/macbook-pro-m4.jpg",
        "/smartwatch.webp",
    '/samsung-galaxy-s23.png',
       "/macbook-pro-m4.jpg",
  ],

};

const page =async () => {
  const cartItems = await cartFetcher();


  return (

      <div className="w-full h-full pt-2 flex justify-center gap-2">

        <div className="w-[65%] flex flex-col gap-4">
           <div className="bg-white flex justify-between w-full mt-2 p-2 rounded-2xl">
      <div className="flex gap-4 items-center">
            <MdOutlineCheckBoxOutlineBlank className="w-6 h-6"/>
           <p>SELECT ALL ITEMS</p>
      </div>
   <div className="flex gap-2 items-center">
    <Trash/> 
    <span className="text-red-600 font-semibold text-xl">Delete</span>
   </div>
    </div>
             <CartItem product={sampleProduct}/>
             <CartItem product={sampleProduct}/>
             <CartItem product={sampleProduct}/>
             <CartItem product={sampleProduct}/>
             <CartItem product={sampleProduct}/>
        </div>

<div className="w-[27%] bg-white p-6 rounded-lg shadow-md h-full"> 
  <h2 className="text-2xl font-bold text-gray-800 mb-6">Order Summary</h2> 


  {/* Shipping Details */}
  <div className="flex justify-between items-center mb-3">
    <p className="text-gray-700">Shipping</p>
    <div className="flex items-center gap-3"> {/* Slightly increased gap */}
      <p className="font-semibold text-gray-800">Rs. [Calculated Shipping]</p>
      <button className="text-blue-600 text-sm hover:underline font-medium">Change</button> {/* Stronger hover */}
    </div>
  </div>

  {/* Subtotal */}
  <div className="flex justify-between items-center text-lg mb-3"> {/* Larger text, consistent spacing */}
    <p className="text-gray-700">Subtotal</p>
    <p className="font-semibold text-gray-800">Rs. [Calculated Subtotal]</p>
  </div>
  {/* Voucher Input */}
  <div className="border-t border-b border-gray-200 py-4 my-4"> {/* Lighter border, more vertical padding */}
    <label htmlFor="voucher" className="block text-sm font-medium text-gray-700 mb-2">
      Have a voucher code?
    </label>
    <div className="flex gap-2">
      <input
        type="text"
        id="voucher"
        placeholder="Enter code" 
        className="flex-grow p-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200" /* Better focus, subtle transition */
      />
      <button className="bg-blue-500 text-white py-2 px-5 rounded-md hover:bg-blue-600 transition duration-200 font-medium"> {/* Primary button style */}
        Apply
      </button>
    </div>
  </div>


  <div className="flex justify-between items-center text-md mb-3 text-green-600"> {/* Green for discount */}
    <p>Voucher Discount</p>
    <p>- Rs. [Calculated Voucher Discount]</p>
  </div>


  <div className="flex justify-between border-t border-gray-300 pt-4 mt-4"> {/* Heavier top border for total */}
    <p className="font-bold text-xl text-gray-800">Total</p> {/* Larger, bolder total */}
    <p className="font-bold text-xl text-blue-700">Rs. [Calculated Total]</p> {/* Prominent total amount */}
  </div>

  <button className="w-full bg-blue-600 text-white py-3 rounded-lg mt-6 hover:bg-blue-700 transition duration-200 text-lg font-semibold shadow-lg"> {/* Larger, more prominent button */}
    Proceed to Checkout
  </button>
</div>


  </div>
  )
}

export default page