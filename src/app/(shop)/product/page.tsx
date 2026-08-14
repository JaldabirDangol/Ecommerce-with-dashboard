import ProductCard from "@/components/ProductCard";
import ProductFilter from "@/components/productFilter"
import { prisma } from "@/lib/db"
import { CubeTransparentIcon } from '@heroicons/react/24/outline';
import Link from "next/link";

export const dynamic = "force-dynamic";

const LIMIT = 30;

const ProductFetcher = async (searchQuery?: string, page = 1) => {
  const allProducts = await prisma.product.findMany({
    where: searchQuery
      ? {
          OR: [
            { name: { contains: searchQuery, mode: "insensitive" } },
            { category: { slug: { contains: searchQuery, mode: "insensitive" } } },
          ],
        }
      : {},
    select: {
      id: true,
      name: true,
      price: true,
      images: true,
      rating: true,
      description: true,
    },
    skip: (page - 1) * LIMIT,
    take: LIMIT,
    orderBy: { createdAt: "desc" },
  });

  return allProducts;
};

interface SearchParamsProps {
  searchParams: Promise<{ search?: string; page?: string }>;
}

const ProductsPage = async ({ searchParams }: SearchParamsProps) => {
  const { search, page: pageParam } = await searchParams;
  const page = Math.max(1, parseInt(pageParam ?? "1", 10) || 1);
  const products = await ProductFetcher(search, page);

  if (!products || products.length === 0) {
    return (
      <div className="w-full flex justify-center max-w-9xl rounded-xl gap-2 shadow-sm mt-2">
        <ProductFilter />
        <div className="flex flex-col items-center justify-center w-full h-screen p-8 rounded-3xl bg-gray-50 border border-gray-200 shadow-inner">
          <CubeTransparentIcon className="w-16 h-16 text-gray-400 mb-4 animate-pulse" />
          <h2 className="text-2xl font-semibold text-gray-700">No products found</h2>
          <p className="text-gray-500 text-base mt-2">
            It looks like there are no items to display right now.
          </p>
        </div>
      </div>
    );
  }

  const buildHref = (p: number) => {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    params.set("page", String(p));
    return `/product?${params.toString()}`;
  };

  return (
    <div className="w-full flex flex-col h-full">
      <div className="w-full flex h-full justify-center max-w-9xl bg-gray-50 rounded-xl gap-2 shadow-sm mt-2">
        <ProductFilter />
        <div className="flex flex-1 flex-wrap gap-2 w-full p-4">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              imageUrl={product.images[0]}
              name={product.name}
              rating={product.rating ?? 0}
              price={product.price}
              description={product.description ?? "No description available"}
            />
          ))}
        </div>
      </div>

      {/* Pagination controls */}
      <div className="flex justify-center gap-4 py-6">
        {page > 1 && (
          <Link
            href={buildHref(page - 1)}
            className="px-4 py-2 rounded-lg bg-white border border-gray-300 text-sm font-medium hover:bg-gray-50"
          >
            ← Previous
          </Link>
        )}
        <span className="px-4 py-2 text-sm text-gray-600">Page {page}</span>
        {products.length === LIMIT && (
          <Link
            href={buildHref(page + 1)}
            className="px-4 py-2 rounded-lg bg-white border border-gray-300 text-sm font-medium hover:bg-gray-50"
          >
            Next →
          </Link>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;