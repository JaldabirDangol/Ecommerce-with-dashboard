import KeySpecification from "@/components/keySpecification";
import ProductDetailSelector from "@/components/productDetailSelector";
import ReviewSection from "@/components/reviewSection";
import ThumbnailGallery from "@/components/thumbnailGallery";
import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import WishlistButton from "@/components/wishListButton";
import { WishlistItem } from "@/types/product";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const resolvedParams = await params;

  const product = await prisma.product.findUnique({
    where: { id: resolvedParams.id },
  });

  console.log("product page ", product);
 if (!product) {
    notFound();
  }

  const WishlistButtonProps:WishlistItem = {
  id: product.id,
  name: product.name,
  price: product?.price,
  image: product.images[0],
  description: product?.description || "",
  dateAdded: product.updatedAt,
  }
 

  return (
    <section className="w-full h-full pt-2 flex flex-col gap-2">
      <article className="flex flex-col md:flex-row gap-8 bg-white p-6 md:p-8 rounded-2xl shadow-xl max-w-9xl mx-auto">
        <ThumbnailGallery images={product.images} productName={product.name} />

        <div className="flex flex-col w-full lg:w-2/5 justify-between gap-6">
          <div className="space-y-4">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight">
              {product.name}
            </h1>

            {product.description && (
              <p className="text-gray-700 text-base leading-relaxed">
                {product?.description}
              </p>
            )}

            <div className="flex items-baseline gap-2">
              <p className="text-3xl font-bold text-green-600">
                रु{product.price.toFixed(2)}
              </p>
              <p className="text-sm text-gray-500">
                {product.stock > 0
                  ? `In Stock (${product.stock} available)`
                  : "Out of Stock"}
              </p>
            </div>

            <ProductDetailSelector
              id={product.id}
              colorOptions={product.colorOptions}
              stock={product.stock}
              name={product.name}
              description={product.description || ""}
              price={product.price}
            />

      <WishlistButton product={WishlistButtonProps}/>
          </div>
        </div>

        <KeySpecification product={product} />
      </article>

      <ReviewSection id={resolvedParams.id} />
    </section>
  );
};

export default Page;