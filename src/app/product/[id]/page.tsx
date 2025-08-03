import ThumbnailGallery from "@/components/thumbnailGallery";
import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {

  const resolvedParams = await params;
  
  const product = await prisma.product.findUnique({
    where: { id: resolvedParams.id },
  });

 if (!product) {
    notFound();
  }

  return (
    <section className="w-full h-full pt-2">
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

            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-2">Color</h2>
              <div className="flex flex-wrap gap-3">
                {product.colorOptions.map((color, index) => (
                  <button
                    key={index}
                    className="flex items-center gap-2 px-3 py-1.5 border border-gray-300 rounded-full text-sm font-medium text-gray-700 hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                    aria-label={`Select color ${color}`}
                  >
                    <span
                      className="w-4 h-4 rounded-full border border-gray-200"
                      style={{ backgroundColor: color }}
                    />
                    {color}
                  </button>
                ))}
              </div>
            </div>


            <div className="flex gap-2">
            <div>
                <h2 className="text-lg font-semibold text-gray-800 mb-2">Quantity</h2>
              <div className="flex items-center gap-3">
                <button
                  className="bg-gray-200 text-gray-800 text-xl font-bold w-10 h-10 rounded-lg flex items-center justify-center hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Decrease quantity"
                  disabled 
                >
                  -
                </button>
                <input
                  type="number"
                  value={1} 
                  min="1"
                  max={product.stock}
                  className="w-16 text-center text-xl font-semibold border border-gray-300 rounded-lg py-1 px-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  aria-label="Product quantity"
                  readOnly 
                />
                <button
                  className="bg-gray-200 text-gray-800 text-xl font-bold w-10 h-10 rounded-lg flex items-center justify-center hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Increase quantity"
                  disabled={1 >= product.stock} 
                >
                  +
                </button>
              </div>
            </div>

          <div className="flex flex-col gap-3">
              <h2 className="text-lg font-semibold text-gray-800">Voucher</h2>

              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder="Enter voucher code"
                  className="flex-grow px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700"
                />
                <button className="px-5 py-2.5 bg-black text-white rounded-xl hover:bg-gray-800 transition-colors duration-200 font-medium">
                  Apply
                </button>
              </div>

             
            </div> 
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 ">
            <button
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition transform hover:scale-105 active:scale-95 shadow-md"
              aria-label="Add to cart"
              disabled={product.stock === 0}
            >
              Add to Cart
            </button>
            <button
              className="flex-1 bg-black hover:bg-gray-800 text-white font-semibold px-6 py-3 rounded-xl transition transform hover:scale-105 active:scale-95 shadow-md"
              aria-label="Buy now"
              disabled={product.stock === 0}
            >
              Buy Now
            </button>
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
    </section>
  );
};

export default Page;