"use client";
import Image from "next/image";
import { CldUploadWidget } from "next-cloudinary";
import { useState } from "react";

export default function ImageUpload() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  return (
    <div className="flex flex-col items-center gap-4">
 

<div className="relative w-[265px] h-[265px]">
  {imageUrl ? (
    <Image
      src={imageUrl}
      alt="Uploaded"
      fill
      className="object-contain rounded-lg shadow"
    />
  ) : (
    <Image
      src="/earbud.jpg"
      alt="Uploaded"
      fill
      className="object-contain rounded-lg shadow"
    />
  )}
</div>

           <CldUploadWidget
        uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!}
        onUpload={(result: any) => {
          setImageUrl(result.info.secure_url); 
          console.log("Uploaded Image URL:", result.info.secure_url);
        }}
      >
        {({ open }) => (
          <button
            onClick={() => open?.()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg"
          >
            Upload Image
          </button>
        )}
      </CldUploadWidget>
    </div>
  );
}
