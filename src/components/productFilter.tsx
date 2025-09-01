import BrandFilter from "@/components/brandFilter"
import { prisma } from "@/lib/db"
import CategoryFilter from "./categoryFilter";

const BrandFetcher = async () => {
  const brands = await prisma.product.findMany({
    distinct: ["brand"],
    select: {
      brand: true,       
    },
  });
  return brands;
};

const CategoryFetcher = async ()=>{
    const categories = await prisma.productCategory.findMany();
    return categories
}

const ColorFetcher = async ()=>{
    const color = await prisma.product.findMany({
        distinct:["colorOptions"],
        select:{
            colorOptions:true
        }
    })

    return color

}


const ProductFilter = async () => {

    const brands = await BrandFetcher();
    const categories = await CategoryFetcher();
    const color = await ColorFetcher();

  return ( 
    <div className="max-w-[20%] w-full h-full flex flex-col gap-2 bg-white p-4">
        
        ProductFilter 
        
        <hr className="w-full"/>

      <CategoryFilter categories={categories}/>

        <hr className="w-full"/>
            {
        brands && <BrandFilter brands={brands}/>
      }
      
        <hr className="w-full"/>
     
     <h2 className="text-lg text-gray-500">Price</h2>

    <div className="flex gap-2 w-full items-center">
         <input type="number" placeholder="Min" className="max-w-[36%] w-full ring-1 ring-blue-100 p-2 rounded-sm "/> 
         <span>-</span>
          <input type="number" placeholder="Max" className="max-w-[36%] w-full ring-1 ring-blue-100 p-2 rounded-sm"/> 

        <span className="inline-flex w-10 h-10 items-center justify-center rounded-full bg-white border border-gray-300 hover:cursor-pointer">
  Go
</span>


    </div>

  <hr className="w-full"/>

<div className="flex flex-col w-full">
  <h2 className="text-lg text-gray-500 mb-2">Rating</h2>

  {[5, 4, 3, 2, 1].map((star) => (
    <label key={star} className="flex items-center gap-2 cursor-pointer">
      <input type="checkbox" className="accent-yellow-500" />
      <div className="flex text-yellow-500">
        {Array.from({ length: star }, (_, i) => (
          <span key={i}>★</span>
        ))}
        {Array.from({ length: 5 - star }, (_, i) => (
          <span key={i} className="text-gray-300">★</span>
        ))}
      </div>
    </label>
  ))}
</div>

  <hr className="w-full"/>
    <h2 className="text-lg text-gray-500">Color</h2>
  <div className="flex gap-2">
       {
        color && color[0].colorOptions.map((item)=>(
           <span
    key={item}
    style={{ backgroundColor: item }}
    className={`flex justify-center px-4 py-2 rounded-xl  capitalize ${item === "white" ? "text-black" : "text-white"} hover:cursor-pointer`}
  >  {item}
  </span>
        ))
       }
  </div>
        
        </div>
  )
}

export default ProductFilter