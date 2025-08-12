import ProductDetailSelector from "@/components/productDetailSelector";
import ReviewSection from "@/components/reviewSection";
import ThumbnailGallery from "@/components/thumbnailGallery";
import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {

  const resolvedParams = await params;
  
  const product = await prisma.product.findUnique({
    where: { id: resolvedParams.id },
  });

  console.log("product page ",product)
 if (!product) {
    notFound();
  }

  return (
    <section className="w-full h-full pt-2 flex flex-col gap-2">
      <article className="flex flex-col lg:flex-row gap-8 bg-white p-6 md:p-8 rounded-2xl shadow-xl max-w-9xl mx-auto">
     <ThumbnailGallery images={product.images} productName={product.name} />

        <div className="flex flex-col w-full lg:w-2/5 justify-between gap-6">
          <div className="space-y-4">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight">
              {product.name}
            </h1>

             {product.description &&
            <p className="text-gray-700 text-base leading-relaxed">
              {product?.description}
            </p>
             }

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

          </div>

         


        </div>

        <div className="flex flex-col w-full lg:w-1/5 bg-gray-100 rounded-2xl p-6 gap-3 shadow-inner">
          <h2 className="text-xl font-bold text-gray-800 border-b pb-3 mb-2 border-gray-200">
            Key Specifications
          </h2>

          <div className="space-y-2 text-gray-700">
            <p className="flex justify-between">
              <strong className="font-semibold">Brand:</strong>{" "}
              <span>{product.brand}</span>
            </p>
            <p className="flex justify-between">
              <strong className="font-semibold">Model:</strong>{" "}
              <span>{product.name.split('"')[0].trim()}</span>
            </p>
            <p className="flex justify-between">
              <strong className="font-semibold">Category:</strong>{" "}
              <span>{product.categoryId}</span>
            </p>
            <p className="flex justify-between">
              <strong className="font-semibold">Availability:</strong>{" "}
              <span
                className={`${
                  product.stock > 0 ? "text-green-600" : "text-red-600"
                } font-medium`}
              >
                {product.stock > 0 ? "In Stock" : "Out of Stock"}
              </span>
            </p>
            <p className="flex justify-between">
              <strong className="font-semibold">Warranty:</strong>{" "}
              <span>{product.warrenty}</span>
            </p>
            {product.reviewsCount > 0 && (
                <p className="flex justify-between">
                    <strong className="font-semibold">Rating:</strong>{" "}
                    <span>{product.averageRating.toFixed(1)}/5 ({product.reviewsCount} reviews)</span>
                </p>
            )}
  {product.weight && (
    <p className="flex justify-between">
      <strong className="font-semibold">Weight:</strong>{" "}
      <span>{product.weight}</span>
    </p>
  )}
  {product.dimensions && (
    <p className="flex justify-between">
      <strong className="font-semibold">Dimensions:</strong>{" "}
      <span>{product.dimensions}</span>
    </p>
  )}
  {product.material && (
    <p className="flex justify-between">
      <strong className="font-semibold">Material:</strong>{" "}
      <span>{product.material}</span>
    </p>
  )}
          </div>
        </div>
      </article>

      <ReviewSection id={resolvedParams.id} />
    </section>
  );
};

export default Page;