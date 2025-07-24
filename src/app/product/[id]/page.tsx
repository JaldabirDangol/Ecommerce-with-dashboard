import ThumbnailGallery from "@/components/thumbnailGallery";

const sampleProduct = {
  id: "prod_mac001",
  name: 'MacBook Pro 14" M3',
  description:
    "Experience unparalleled performance with the Apple M3 chip, featuring an 8-core CPU and 10-core GPU. Boasting 16GB RAM and a lightning-fast 512GB SSD, all showcased on a stunning Liquid Retina XDR display.",
  isPublished: true,
  price: 1999.99,
  stock: 12,
  images: [ // Changed 'image' to 'images' to hold multiple image paths
    "/macbook-pro-m4.jpg",
        "/smartwatch.webp",
    '/samsung-galaxy-s23.png',
       "/macbook-pro-m4.jpg",
  ],
  category: "Laptops", // Changed categoryId to a more readable string
  brand: "Apple", // Added brand directly
  colorOptions: [ // Added an array for color options
    { name: "Silver", hex: "#C0C0C0" },
    { name: "Space Gray", hex: "#56595B" },
    { name: "Midnight", hex: "#1C1C1E" },
  ],
  warranty: "1 Year", // Added warranty info
  reviewsCount: 45, // Example: number of reviews
  averageRating: 4.8, // Example: average rating

  dimensions: '0.61"H x 12.31"W',
  
  weight: '3.5 lbs (1.6 kg)',
  material: "Aluminum Enclosure",
};

const Page = () => {

  return (
    <section className="w-full h-full pt-2">
      <article className="flex flex-col lg:flex-row gap-8 bg-white p-6 md:p-8 rounded-2xl shadow-xl max-w-9xl mx-auto">
     <ThumbnailGallery images={sampleProduct.images} productName={sampleProduct.name} />

        {/* Product Info & Actions */}
        <div className="flex flex-col w-full lg:w-2/5 justify-between gap-6">
          <div className="space-y-4">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight">
              {sampleProduct.name}
            </h1>
            <p className="text-gray-700 text-base leading-relaxed">
              {sampleProduct.description}
            </p>

            {/* Price & Stock */}
            <div className="flex items-baseline gap-2">
              <p className="text-3xl font-bold text-green-600">
                ${sampleProduct.price.toFixed(2)}
              </p>
              <p className="text-sm text-gray-500">
                {sampleProduct.stock > 0
                  ? `In Stock (${sampleProduct.stock} available)`
                  : "Out of Stock"}
              </p>
            </div>

            {/* Color Options */}
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-2">Color</h2>
              <div className="flex flex-wrap gap-3">
                {sampleProduct.colorOptions.map((color, index) => (
                  <button
                    key={index}
                    className="flex items-center gap-2 px-3 py-1.5 border border-gray-300 rounded-full text-sm font-medium text-gray-700 hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                    aria-label={`Select color ${color.name}`}
                  >
                    <span
                      className="w-4 h-4 rounded-full border border-gray-200"
                      style={{ backgroundColor: color.hex }}
                    />
                    {color.name}
                  </button>
                ))}
              </div>
            </div>


            {/* Quantity Selector */}
            <div className="flex gap-2">
            <div>
                <h2 className="text-lg font-semibold text-gray-800 mb-2">Quantity</h2>
              <div className="flex items-center gap-3">
                <button
                  className="bg-gray-200 text-gray-800 text-xl font-bold w-10 h-10 rounded-lg flex items-center justify-center hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Decrease quantity"
                  disabled // Add logic to enable/disable
                >
                  -
                </button>
                <input
                  type="number"
                  value={1} // Use state for quantity
                  min="1"
                  max={sampleProduct.stock}
                  className="w-16 text-center text-xl font-semibold border border-gray-300 rounded-lg py-1 px-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  aria-label="Product quantity"
                  readOnly // Set to false if you want direct input
                />
                <button
                  className="bg-gray-200 text-gray-800 text-xl font-bold w-10 h-10 rounded-lg flex items-center justify-center hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Increase quantity"
                  disabled={1 >= sampleProduct.stock} // Add logic to enable/disable
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

                {/* <div className="text-sm text-gray-600 mt-1">
                <p className="font-semibold mb-1">Available Offers:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>
                    <strong className="text-gray-800">SAVE10</strong>: 10% off
                  </li>
                  <li>
                    <strong className="text-gray-800">FREESHIP</strong>: Free
                    shipping on orders over $50
                  </li>
                </ul>
              </div>  */}
            </div> 
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 ">
            <button
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition transform hover:scale-105 active:scale-95 shadow-md"
              aria-label="Add to cart"
              disabled={sampleProduct.stock === 0}
            >
              Add to Cart
            </button>
            <button
              className="flex-1 bg-black hover:bg-gray-800 text-white font-semibold px-6 py-3 rounded-xl transition transform hover:scale-105 active:scale-95 shadow-md"
              aria-label="Buy now"
              disabled={sampleProduct.stock === 0}
            >
              Buy Now
            </button>
          </div>
        </div>

        {/* Key Specs / Additional Info */}
        <div className="flex flex-col w-full lg:w-1/5 bg-gray-100 rounded-2xl p-6 gap-3 shadow-inner">
          <h2 className="text-xl font-bold text-gray-800 border-b pb-3 mb-2 border-gray-200">
            Key Specifications
          </h2>

          <div className="space-y-2 text-gray-700">
            <p className="flex justify-between">
              <strong className="font-semibold">Brand:</strong>{" "}
              <span>{sampleProduct.brand}</span>
            </p>
            <p className="flex justify-between">
              <strong className="font-semibold">Model:</strong>{" "}
              <span>{sampleProduct.name.split('"')[0].trim()}</span>
            </p>
            <p className="flex justify-between">
              <strong className="font-semibold">Category:</strong>{" "}
              <span>{sampleProduct.category}</span>
            </p>
            <p className="flex justify-between">
              <strong className="font-semibold">Availability:</strong>{" "}
              <span
                className={`${
                  sampleProduct.stock > 0 ? "text-green-600" : "text-red-600"
                } font-medium`}
              >
                {sampleProduct.stock > 0 ? "In Stock" : "Out of Stock"}
              </span>
            </p>
            <p className="flex justify-between">
              <strong className="font-semibold">Warranty:</strong>{" "}
              <span>{sampleProduct.warranty}</span>
            </p>
            {sampleProduct.reviewsCount > 0 && (
                <p className="flex justify-between">
                    <strong className="font-semibold">Rating:</strong>{" "}
                    <span>{sampleProduct.averageRating.toFixed(1)}/5 ({sampleProduct.reviewsCount} reviews)</span>
                </p>
            )}
  {sampleProduct.weight && (
    <p className="flex justify-between">
      <strong className="font-semibold">Weight:</strong>{" "}
      <span>{sampleProduct.weight}</span>
    </p>
  )}
  {sampleProduct.dimensions && (
    <p className="flex justify-between">
      <strong className="font-semibold">Dimensions:</strong>{" "}
      <span>{sampleProduct.dimensions}</span>
    </p>
  )}
  {sampleProduct.material && (
    <p className="flex justify-between">
      <strong className="font-semibold">Material:</strong>{" "}
      <span>{sampleProduct.material}</span>
    </p>
  )}
          </div>
        </div>
      </article>
    </section>
  );
};

export default Page;