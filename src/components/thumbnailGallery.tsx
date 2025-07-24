// components/ThumbnailGallery.jsx
'use client'; // This directive makes this file and any components imported into it a Client Component

import { useState } from 'react';
import Image from 'next/image';

type thumbnailGalleryProps = {
  images:string[];
  productName:string;
}

const ThumbnailGallery = ({ images, productName }:thumbnailGalleryProps) => {
  const [mainImage, setMainImage] = useState(images[0]);

  return (
    <div className="w-full md:w-1/3 flex flex-col gap-4">
      {/* Main Image */}
      <div className="w-full aspect-video md:aspect-[4/3] flex justify-center items-center rounded-xl overflow-hidden border border-gray-200 ">
        <Image
          src={mainImage} // Uses the state
          alt={productName}
          height={600}
          width={800}
          className="object-contain max-w-[95%] max-h-[95%] hover:scale-105 transition-transform duration-300 ease-in-out"
          priority
        />
      </div>

      {/* Thumbnails */}
      <div className="flex gap-3 overflow-x-auto justify-center md:justify-start">
        {images.map((img, index) => (
       <div
  key={index}
  onClick={() => setMainImage(img)}
  className={`relative w-20 h-20 md:w-24 md:h-24 rounded-md border shrink-0 cursor-pointer transition-all duration-200 ease-in-out ${
    img === mainImage
      ? 'border-4 border-gray-600 shadow-md' // Stronger border, darker indigo, subtle shadow
      : 'border-gray-200 hover:border-gray-400' // Lighter hover for unselected
  }`}
>
            <Image
              src={img}
              alt={`Thumbnail ${index + 1} of ${productName}`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-contain p-1"
            />
          </div>
        ))}
      </div>
      
    </div>
  );
};

export default ThumbnailGallery;