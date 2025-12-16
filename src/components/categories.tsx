import React from 'react'
import Image from 'next/image'
import Link from 'next/link';
import { ProductCategory } from '@prisma/client';
import { prisma } from '@/lib/db';


export default async function Categories() {
   const categoriesItem:ProductCategory[] = await prisma.productCategory.findMany();

   console.log(categoriesItem)
  return (
    <div className='w-ful h-full'>

    <h2 className='text-2xl font-semibold'>
        Categories
      </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4 w-full p-4">
      {categoriesItem.map((item) => (
        <Link
          key={item.id}
          href={`/product?search=${item.slug}`}
          target="_blank"  
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center p-2 rounded-xl bg-main-300 hover:shadow-md transition"
        >
          <div className="w-[80px] h-[80px] flex items-center justify-center overflow-hidden">
            <Image
              width={64}
              height={64}
             src={item.image ?? ""}
              alt={item.name}
              className="object-contain max-h-[90%] max-w-[90%] w-full"
            />
          </div>
          <span className="mt-2 text-sm text-center">{item.name}</span>
        </Link>
      ))}
    </div>
    </div>
  );
};