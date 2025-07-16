import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

type ProductFeatureCardProps = {
  title: string;
  subtitle?: string;
  imageUrl: string;
  href: string;
};

export const ProductFeatureCard = ({
  title,
  subtitle,
  imageUrl,
  href,
}: ProductFeatureCardProps) => {
  return (
    <div className="relative h-[200px] max-w-xl rounded-3xl overflow-hidden group shadow-md">
      <Image
        src={imageUrl}
        alt={title}
        fill
        className="object-contain transition duration-300 group-hover:scale-105"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-transparent z-10" />

      <Link
        href={href}
        className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/80 hover:bg-white transition"
      >
        <ArrowUpRight className="h-5 w-5 text-black" />
      </Link>

      <div className="absolute bottom-4 left-4 z-20 text-white">
        <h3 className="text-lg font-semibold">{title}</h3>
        {subtitle && <p className="text-sm">{subtitle}</p>}
      </div>
    </div>
  );
};
