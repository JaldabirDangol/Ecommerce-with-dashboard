import React from 'react'
import ProductCard from '@/components/ProductCard'
import {prisma} from "@/lib/db"



const JustForYou =async () => {

  const products = await prisma.product.findMany({
      take:12,
      orderBy:{createdAt:"desc"}
  })
  return (
    <div className='flex flex-col w-full'>
      
      <h2>Just For You</h2>
    <div className='flex flex-wrap gap-2 w-full justify-between p-4'>
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

export default JustForYou