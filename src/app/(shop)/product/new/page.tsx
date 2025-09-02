import { prisma } from "@/lib/db";
import ProductCard from '@/components/ProductCard';

export default async function NewProductsPage() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
    take: 10,
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">
        Latest Products
      </h1>

      {products.length === 0 ? (
        <p className="text-gray-500 text-center">No products yet.</p>
      ) : (
        <div className='flex flex-wrap gap-2 w-full'>
          {products.map((product) => (
            <ProductCard
              key={product.id} 
              id={product.id}
              imageUrl={product.images[0]}
              name={product.name}
              rating={(product as any).rating ?? 0}
              price={product.price}
              description={product.description ?? "No description available"}
            />
          ))}
        </div>
      )}
    </div>
  );
}