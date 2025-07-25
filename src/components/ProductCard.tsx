import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface ProductCardProps{
    imageUrl?:string,
    name:string,
    rating?:number,
    price:number,
    description?:string
}

const ProductCard = ({imageUrl,name,rating,price,description}:ProductCardProps) => {
  return (
   <Link href={`/product/${name}`} passHref>
  
      <div className='flex flex-col w-[320px] bg-main-300 my-2 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer'> {/* Added cursor-pointer for better UX */}
        <div className="w-full flex justify-center items-center bg-white h-[300px] overflow-hidden rounded-t-2xl">
          <Image
            src={imageUrl ?? ""}
            alt={name}
            width={300}
            height={300}
            className="object-contain max-h-[90%] max-w-[90%]"
          />
        </div>
        <div className='p-4'>
          <h2 className='text-xl font-semibold text-gray-800 mb-1'>{name}</h2>
          <p className='text-gray-600 text-sm mb-2 line-clamp-2'>{description}</p>
          <p className='text-yellow-500 text-base mb-1'>Rating: {rating} / 5</p>
          <p className='text-gray-900 font-bold text-lg'>Price: Rs. {price}</p>
        </div>
      </div>
    </Link>
  )
}

export default ProductCard