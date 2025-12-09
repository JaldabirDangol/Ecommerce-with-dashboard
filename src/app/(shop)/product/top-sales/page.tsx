import { prisma } from "@/lib/db";
import ProductCard from "@/components/ProductCard";
import { Product } from "@prisma/client";

export default async function TopSalesPage() {
  const products: Product[] = await prisma.product.findMany({
    orderBy: { price: "desc" },
    take: 10,
  });

  return (
    <div className="bg-gray-50 mt-2">
      <div className="relative overflow-hidden bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-6xl">
              Our Top Sellers
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Discover the most popular products loved by our customers.
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {products.length === 0 ? (
          <p className="text-xl text-gray-500 text-center mt-10">
            No top-selling products available right now.
          </p>
        ) : (
          <div className="flex flex-wrap gap-4 w-full justify-center">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                imageUrl={
                  product.images[0] ||
                  "https://placehold.co/600x400/f0f0f0/888888?text=Image+Not+Found"
                }
                name={product.name}
                rating={product.rating ?? 0} 
                price={product.price}
                description={product.description ?? "No description available"}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
