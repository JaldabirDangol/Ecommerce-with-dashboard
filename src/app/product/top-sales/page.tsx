
import { prisma } from "@/lib/db";
import ProductCard from '@/components/ProductCard'
import { Product } from "@/types/product";

const MOCK_PRODUCTS:Product[] = [
  {
    id: "1",
    name: "Apple 2025 MacBook Air",
    price: 140000.00,
    images: ["https://placehold.co/600x400/000000/FFFFFF?text=MacBook"],
    rating: 4.5,
    description: "Experience unmatched performance with the MacBook Air powered by the M4 chip. Designed with cutting-edge Apple Silicon, it delivers lightning-fast speeds and incredible efficiency.",
  },
  {
    id: "2",
    name: "Dell 27 Monitor S2725H",
    price: 199999.00,
    images: ["https://placehold.co/600x400/000000/FFFFFF?text=Dell+Monitor"],
    rating: 4.8,
    description: "Enjoy stunning visuals with the Dell 27 Monitor. Its Full HD display and IPS panel offer vibrant colors and wide viewing angles.",
  },
  {
    id: "3",
    name: "Product 3",
    price: 99.99,
    images: ["https://placehold.co/600x400/000000/FFFFFF?text=Product+3"],
    rating: 3.2,
    description: "This is a great product with amazing features.",
  },
  {
    id: "4",
    name: "Product 4",
    price: 249.50,
    images: ["https://placehold.co/600x400/000000/FFFFFF?text=Product+4"],
    rating: 5.0,
    description: "An excellent choice for all your needs.",
  },
  {
    id: "5",
    name: "Product 5",
    price: 75.00,
    images: ["https://placehold.co/600x400/000000/FFFFFF?text=Product+5"],
    rating: 4.1,
    description: "High quality and durable.",
  },
];

export default async function TopSalesPage() {
  const products = await prisma.product.findMany({
    orderBy: { price: "desc" },
    take: 10,
  });

  const displayProducts = products.length > 0 ? products : MOCK_PRODUCTS;

  return (
    <div className="bg-gray-50">
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
        {displayProducts.length === 0 ? (
          <p className="text-xl text-gray-50 text-center mt-10">No top-selling products available right now.</p>
        ) : (
        <div className='flex flex-wrap gap-2 w-full '>
            {displayProducts.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                imageUrl={product.images[0] || 'https://placehold.co/600x400/f0f0f0/888888?text=Image+Not+Found'}
                name={product.name}
                rating={(product as any).rating ?? 0}
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
