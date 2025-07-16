import React from 'react'
import ProductCard from '@/components/ProductCard'
const products = [
  {
     imageUrl: "/macbook-pro-m4.jpg",
    name: 'MacBook Pro 16-inch',
    rating: 4.8,
    price: 2499,
    description: 'Powerful laptop with Apple M1 Pro chip and Retina display.',
  },
  {
      imageUrl: "/smartwatch.webp",
    name: 'AirPods Pro',
    rating: 4.5,
    price: 249,
    description: 'Wireless earbuds with noise cancellation.',
  },
  {
    imageUrl: '/samsung-galaxy-s23.png',
    name: 'Samsung Galaxy S23',
    rating: 4.3,
    price: 799,
    description: 'Flagship smartphone with AMOLED display.',
  }, {
     imageUrl: "/macbook-pro-m4.jpg",
    name: 'MacBook Pro 16-inch',
    rating: 4.8,
    price: 2499,
    description: 'Powerful laptop with Apple M1 Pro chip and Retina display.',
  },
  {
      imageUrl: "/smartwatch.webp",
    name: 'AirPods Pro',
    rating: 4.5,
    price: 249,
    description: 'Wireless earbuds with noise cancellation.',
  },
  {
    imageUrl: '/samsung-galaxy-s23.png',
    name: 'Samsung Galaxy S23',
    rating: 4.3,
    price: 799,
    description: 'Flagship smartphone with AMOLED display.',
  }, {
     imageUrl: "/macbook-pro-m4.jpg",
    name: 'MacBook Pro 16-inch',
    rating: 4.8,
    price: 2499,
    description: 'Powerful laptop with Apple M1 Pro chip and Retina display.',
  },
  {
      imageUrl: "/smartwatch.webp",
    name: 'AirPods Pro',
    rating: 4.5,
    price: 249,
    description: 'Wireless earbuds with noise cancellation.',
  },
  {
    imageUrl: '/samsung-galaxy-s23.png',
    name: 'Samsung Galaxy S23',
    rating: 4.3,
    price: 799,
    description: 'Flagship smartphone with AMOLED display.',
  }, {
     imageUrl: "/macbook-pro-m4.jpg",
    name: 'MacBook Pro 16-inch',
    rating: 4.8,
    price: 2499,
    description: 'Powerful laptop with Apple M1 Pro chip and Retina display.',
  },
  {
      imageUrl: "/smartwatch.webp",
    name: 'AirPods Pro',
    rating: 4.5,
    price: 249,
    description: 'Wireless earbuds with noise cancellation.',
  },
  {
    imageUrl: '/samsung-galaxy-s23.png',
    name: 'Samsung Galaxy S23',
    rating: 4.3,
    price: 799,
    description: 'Flagship smartphone with AMOLED display.',
  },
 
]

const JustForYou = () => {
  return (
    <div className='flex flex-col w-full'>
      
      <h2>Just For You</h2>
    <div className='flex flex-wrap gap-4 w-full justify-between p-4'>
       {
        products.map((product,idx)=>(
         <ProductCard
          key={idx}
          imageUrl={product.imageUrl}
          name={product.name}
          rating={product.rating}
          price={product.price}
          description={product.description}
        />
        ))
       }

    </div>
    </div>
  )
}

export default JustForYou