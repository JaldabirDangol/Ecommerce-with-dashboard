import React from 'react'
import Image from 'next/image'

interface ProductCardProps{
    imageUrl?:string,
    name:string,
    rating?:number,
    price:number,
    description?:string
}

const ProductCard = ({imageUrl,name,rating,price,description}:ProductCardProps) => {
  return (
    <div className='flex flex-col w-[320px] bg-main-300  my-4 gap-2  rounded-2xl'>
      <div className="w-full flex justify-center items-center bg-white  h-[300px] overflow-hidden rounded-t-2xl">
  <Image
    src={imageUrl ?? ""}
    alt="product"
    width={300}
    height={300}
    className="object-contain max-h-[90%] max-w-[90%]"
  />
</div>
<div className='p-2 '> 
 <h2 className='text-xl font-semibold'>{name}</h2>
      <h2>{description}</h2>
      <h2>rating - {rating}</h2>
      <h2>price - {price}</h2>
</div>
     
    </div>
  )
}

export default ProductCard