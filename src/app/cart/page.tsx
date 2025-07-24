import { CartItem } from "@/components/cartItem"
import { Trash } from "lucide-react";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import { MdOutlineCheckBox } from "react-icons/md";
const sampleProduct = {
  id: "prod_mac001",
  name: 'MacBook Pro 14" M3',
  description:
    "Experience unparalleled performance with the Apple M3 chip, featuring an 8-core CPU and 10-core GPU. Boasting 16GB RAM and a lightning-fast 512GB SSD, all showcased on a stunning Liquid Retina XDR display.",
  isPublished: true,
  price: 1999.99,
  stock: 12,
  images: [ // Changed 'image' to 'images' to hold multiple image paths
    "/macbook-pro-m4.jpg",
        "/smartwatch.webp",
    '/samsung-galaxy-s23.png',
       "/macbook-pro-m4.jpg",
  ],
  category: "Laptops", // Changed categoryId to a more readable string
  brand: "Apple", // Added brand directly
  colorOptions: [ // Added an array for color options
    { name: "Silver", hex: "#C0C0C0" },
    { name: "Space Gray", hex: "#56595B" },
    { name: "Midnight", hex: "#1C1C1E" },
  ],
  warranty: "1 Year", // Added warranty info
  reviewsCount: 45, // Example: number of reviews
  averageRating: 4.8, // Example: average rating

  dimensions: '0.61"H x 12.31"W',
  
  weight: '3.5 lbs (1.6 kg)',
  material: "Aluminum Enclosure",
};

const page = () => {
  return (

   

      <div className="w-full h-full pt-2 flex justify-center gap-2">

        <div className="w-[65%] flex flex-col gap-4">
           <div className="bg-white flex justify-between w-full mt-2 p-2">
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

       <div className="w-[27%]">
         price detail
       </div>


  </div>
  )
}

export default page