"use client";

import Image from "next/image";
import { CldUploadWidget } from "next-cloudinary";
import { useState } from "react";
import { useFormContext } from "react-hook-form";

export default function ImageUpload() {
  const { setValue, getValues } = useFormContext();

  const [localImages, setLocalImages] = useState<string[]>(() => getValues("images") || []);

  const handleUploadSuccess = (result: any) => {
    const newUrl = result.info.secure_url;
    const updatedImages = [...localImages, newUrl];
    setLocalImages(updatedImages);
    setValue("images", updatedImages, { shouldValidate: true });
  };

  // Remove image handler by index
  const removeImage = (index: number) => {
    const updatedImages = localImages.filter((_, i) => i !== index);
    setLocalImages(updatedImages);
    setValue("images", updatedImages, { shouldValidate: true });
  };

  return (
    <div className="flex flex-col items-center gap-4 w-full h-full">
      <div className="relative w-full max-w-[400px] h-[350px] flex flex-wrap justify-center items-center gap-2 p-2">
        {localImages.length > 0 ? (
          localImages.slice(0, 4).map((url, index) => (
            <div key={url} className="relative w-[48%] h-[48%] rounded-lg overflow-hidden">
              <Image
                src={url}
                alt={`Uploaded image ${index + 1}`}
                fill
                className="object-cover rounded-lg shadow"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-1 right-1 bg-red-600 rounded-full p-1 text-white text-xs hover:bg-red-700"
                aria-label={`Remove image ${index + 1}`}
              >
                &times;
              </button>
            </div>
          ))
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
        onSuccess={handleUploadSuccess}
      >
        {({ open }) => (
          <button
            type="button"
            onClick={() => open?.()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg"
          >
            {localImages.length > 0 ? "Select More" : "Upload Image"}
          </button>
        )}
      </CldUploadWidget>
    </div>
  );
}
