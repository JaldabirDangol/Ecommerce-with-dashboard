"use client";
import Image from "next/image";
import { CldUploadWidget } from "next-cloudinary";
import { useState } from "react";

export default function ImageUpload() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  console.log(imageUrl)

  return (
    <div className="flex flex-col items-center gap-4 w-full h-full">
 

 <div className="relative w-full   max-w-[400px] h-[350px] rounded-lg shadow flex justify-center items-center bg-gray-100">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt="Uploaded"
            fill
            className="object-contain rounded-lg shadow"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-20 h-20 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7M3 7l9 6 9-6"
            />
          </svg>
        )}
      </div>

           <CldUploadWidget
        uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!}
        onSuccess={(result: any) => {
          setImageUrl(result.info.secure_url); 
          console.log("Uploaded Image URL:", result.info.secure_url);
        }}
      >
        {({ open }) => (
          <button
            onClick={() => open?.()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg"
          >
          {
            imageUrl ? 'Change Image' : 'Upload Image'
          }
          </button>
        )}
      </CldUploadWidget>
    </div>
  );
}
