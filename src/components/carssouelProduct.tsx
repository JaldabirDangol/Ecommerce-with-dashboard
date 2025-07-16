import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

type ProductCardProps = {
  title: string;
  description: string;
  label: string;
  imageUrl: string;
};

export const CarasouelCard = ({ title, description, label, imageUrl }: ProductCardProps) => {
  return (
    <div className="relative flex flex-col md:flex-row items-center justify-between bg-gradient-to-br from-[#f1f4f5] to-[#e8f0f8] rounded-3xl p-8 shadow-xl w-full h-[400px] overflow-hidden">
      {/* Left content */}
      <div className="flex flex-col gap-4 max-w-md z-10">
        <span className="text-sm font-medium bg-white/80 px-3 py-1 rounded-full w-fit border">
          {label}
        </span>

        <h2 className="text-4xl font-bold text-gray-900 leading-snug">{title}</h2>

        <p className="text-sm text-gray-600">{description}</p>

       <Link
  href="/products"
  className="flex items-center gap-2 bg-black text-white px-5 py-3 rounded-full hover:bg-gray-800 transition w-fit mt-2"
>
  View All Products <ArrowUpRight className="size-4" />
</Link>
      </div>

      {/* Right image */}
      <div className="relative z-10 mt-6 md:mt-0">
        <Image
          src={imageUrl}
          alt={title}
          width={280}
          height={280}
          className="object-contain"
        />
      </div>
    </div>
  );
};
