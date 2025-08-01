"use client";

import { useState, useTransition } from "react";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { toast } from "sonner";

export default function UploadForm() {
  const [isPending, startTransition] = useTransition();
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const handleUploadSuccess = (result: any) => {
    if (result?.info?.secure_url) {
      setImageUrl(result.info.secure_url);
    }
  };

const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  const form = e.currentTarget; 
  const formData = new FormData(form);

  if (imageUrl) {
    formData.append("image", imageUrl);
  } else {
    toast.error("Please upload an image first.");
    return;
  }

  startTransition(async () => {
    try {
      const res = await fetch("/api/product/category", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Something went wrong");
        return;
      }

      if (data?.success) {
        toast.success(data.message);
        form.reset(); // safe now
        setImageUrl(null);
      }
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  });
};


  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md flex flex-col p-4 rounded-lg shadow-lg bg-gray-50">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Title
        </label>
        <input
          type="text"
          name="title"
          id="title"
          required
          className="w-full rounded-md border-gray-300 border px-3 py-2 mt-1 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          placeholder="Enter a title"
        />
      </div>

      <div className="max-w-[450px] max-h-[350px] h-full w-full flex flex-col gap-2">
        <label className="block text-sm font-medium text-gray-700">Upload Image</label>
        <div className="relative aspect-square overflow-hidden rounded-2xl shadow-md border bg-white flex items-center justify-center">
          <Image
            src={imageUrl || "https://placehold.co/400x400/E5E7EB/4B5563?text=Placeholder"}
            alt="Uploaded preview"
            width={400}
            height={400}
            className="object-contain transition-transform duration-300 hover:scale-105"
            priority 
          />
        </div>
      </div>

      <CldUploadWidget
        uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!} 
        onSuccess={handleUploadSuccess}
      >
        {({ open }) => (
          <button
            type="button"
            onClick={() => open?.()}
            className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors"
          >
            {imageUrl ? "Replace Image" : "Upload Image"}
          </button>
        )}
      </CldUploadWidget>

      <button
        type="submit"
        disabled={isPending || !imageUrl}
        className="bg-blue-600 text-white font-semibold px-4 py-2 rounded-md shadow-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors"
      >
        {isPending ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}
