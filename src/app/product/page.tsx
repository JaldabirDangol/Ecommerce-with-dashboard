import ProductCard from "@/components/ProductCard";
import ProductFilter from "@/components/productFilter"
import { prisma } from "@/lib/db"

const allProductFetcher = async()=>{
 const page = 1;
const limit = 30;
     const allProducts= await prisma.product.findMany({
        skip: (page - 1) * limit, 
        take: limit, 
       orderBy:{createdAt:"desc"},
     })

     return allProducts;
}


const ProductsPage = async() => {
  const products = await allProductFetcher();
  return (
    <div className="w-full flex justify-center max-w-9xl bg-gray-50  rounded-xl gap-2 shadow-sm mt-2">
           <ProductFilter/>

          <div className='flex flex-1 flex-wrap gap-2 w-full p-4'>
       {
        products.map((product,idx)=>(
         <ProductCard
          key={idx}
          id={product.id}
          imageUrl={product.images[0]}
          name={product.name}
          rating={(product as any).rating ?? 0} 
          price={product.price}
          description={product.description ?? "No description available"}

        />
        ))
       }

    </div>
    </div>
  )
}

export default ProductsPage