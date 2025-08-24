import ProductCard from "@/components/ProductCard";
import ProductFilter from "@/components/productFilter"
import { prisma } from "@/lib/db"
import { CubeTransparentIcon } from '@heroicons/react/24/outline';

const ProductFetcher = async(searchQuery?: string)=>{
const page = 1;
const limit = 30;

     const allProducts= await prisma.product.findMany({

        where: searchQuery
      ? {
          name: {
            contains: searchQuery,      
            mode: "insensitive",       
          },
        }
      : {},    
        skip: (page - 1) * limit, 
        take: limit, 
       orderBy:{createdAt:"desc"},
     })

     return allProducts;
}

interface SearchParamsProps {
  searchParams: Promise<{ search?: string }>;
}

const ProductsPage = async( {searchParams}:SearchParamsProps ) => {

  const {search} = await searchParams;
  const products = await ProductFetcher(search);

 if (!products || products.length === 0) {
    return (    <div className="w-full flex justify-center max-w-9xl  rounded-xl gap-2 shadow-sm mt-2">  
      <ProductFilter/>
    <div className="flex flex-col items-center justify-center w-full min-h-[250px] p-8  rounded-3xl bg-gray-50 border border-gray-200 shadow-inner">
      <CubeTransparentIcon className="w-16 h-16 text-gray-400 mb-4 animate-pulse" />
      <h2 className="text-2xl font-semibold text-gray-700">No products found</h2>
      <p className="text-gray-500 text-base mt-2">
        It looks like there are no items to display right now.
      </p>
    </div>
    </div>
  );
  }

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