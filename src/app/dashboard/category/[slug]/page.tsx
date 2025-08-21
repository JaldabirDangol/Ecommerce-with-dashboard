"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { FaExclamationTriangle, FaBoxOpen } from "react-icons/fa";
import { MoreVerticalIcon, Edit, Trash2 } from "lucide-react";
import { ProductCardSkeleton } from "@/components/productCardSkeleton";
import Link from "next/link";

interface Product {
  id: string;
  name: string;
  price: number;
  images?: [string];
  isPublished?:boolean;
  stock:number
}

const ProductCard = ({ product }: { product: Product }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleDelete = () => {
    console.log(`Deleting product: ${product.name}`);
    setIsDropdownOpen(false);
  };

  return (
    <div className="relative bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">

      {product.images && product.images.length > 0 && (
        <div className="relative w-full h-48 sm:h-56">
          <Image
            src={product.images[0]}
            alt={product.name}
            layout="fill"
            objectFit="cover"
            className="rounded-t-xl"
          />

          <div
            className={`absolute top-2 left-2 px-3 py-1 rounded-full text-xs font-semibold ${
              product.isPublished
                ? "bg-green-500 text-white"
                : "bg-red-500 text-white"
            }`}
          >
            {product.isPublished ? "Published" : "Draft"}
          </div>
        </div>
      )}

      <div className="p-5 flex flex-col justify-between h-auto">
        <div>
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 leading-tight truncate mb-1">
            {product.name}
          </h3>
          <p className="text-gray-600 text-md sm:text-lg font-semibold">
            ${product.price.toFixed(2)}
          </p>
          <p className="text-gray-500 text-sm mt-1">
            <span className="font-semibold">Stock:</span> {product.stock}
          </p>
        </div>

     
        <div className="absolute top-4 right-4 z-10">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="p-2 rounded-full bg-white bg-opacity-80 hover:bg-opacity-100 text-gray-700 hover:text-gray-900 transition-colors duration-200"
          >
            <MoreVerticalIcon size={20} />
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1">
                <Link href={`/dashboard/products/edit?id=${product.id}`}
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                >
                  <Edit size={16} className="mr-2" />
                  Edit Product
                </Link>
                <button
                  onClick={handleDelete}
                  className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left"
                >
                  <Trash2 size={16} className="mr-2" />
                  Delete Product
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default function CategoryProductPage() {
  const params = useParams();
  const categorySlug = params.slug as string;

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!categorySlug) {
      setLoading(false);
      return;
    }

    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(
          `/api/dashboard/category/products/${categorySlug}`
        );
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Failed to fetch products");
        }

        setProducts(data.products || []);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categorySlug]);

  const displayCategoryName =categorySlug?.replace(/-/g, " ");

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="container mx-auto max-w-7xl">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-2">
          {displayCategoryName}
        </h1>
        <p className="text-xl text-gray-500 mb-10">
          Viewing products in this category.
        </p>

        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            <ProductCardSkeleton />
            <ProductCardSkeleton />
            <ProductCardSkeleton />
            <ProductCardSkeleton />
            <ProductCardSkeleton />
            <ProductCardSkeleton />
          </div>
        )}

        {error && (
          <div className="flex flex-col items-center justify-center p-12 bg-red-50 rounded-lg border-2 border-red-200 text-red-700">
            <FaExclamationTriangle className="text-6xl mb-4" />
            <h2 className="text-2xl font-semibold mb-2">Something went wrong!</h2>
            <p className="text-center">{error}</p>
          </div>
        )}

        {!loading && !error && products.length === 0 && (
          <div className="flex flex-col items-center justify-center p-12 bg-white rounded-lg shadow-inner text-gray-500">
            <FaBoxOpen className="text-6xl mb-4" />
            <h2 className="text-2xl font-semibold mb-2">No Products Found</h2>
            <p className="text-center">
              It seems there are no products in this category yet.
            </p>
          </div>
        )}

        {!loading && !error && products.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}