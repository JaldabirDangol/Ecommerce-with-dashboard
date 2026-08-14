import React from 'react'
import ProductCard from '@/components/ProductCard'
import { prisma } from "@/lib/db"
import { unstable_cache } from "next/cache"

const getLatestProducts = unstable_cache(
  async () => {
    return prisma.product.findMany({
      take: 12,
      orderBy: { createdAt: "desc" },
      select: { id: true, name: true, price: true, images: true, rating: true, description: true },
    });
  },
  ["just-for-you"],
  { revalidate: 60 }
);

const JustForYou = async () => {
  const products = await getLatestProducts();
  return (
    <div className='flex flex-col w-full'>
      <h2 className='text-2xl font-semibold '>Just For You</h2>
      <div className='flex flex-wrap gap-2 w-full p-4'>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            imageUrl={product.images[0]}
            name={product.name}
            rating={product.rating ?? 0}
            price={product.price}
            description={product.description ?? "No description available"}
          />
        ))}
      </div>
    </div>
  )
}

export default JustForYou