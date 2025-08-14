"use client";
import { useCartStore } from "@/store/cartStore";
import React, { useState, useTransition } from "react";
import { toast } from "sonner";
import {updateCartItem} from "@/actions/cart"
import { useRouter } from "next/navigation";


interface ProductDetailSelectorType {
  id: string;
  colorOptions: string[];
  stock: number;
  name: string;
  description: string;
  price:number
}

const ProductDetailSelector = ({ id, colorOptions, stock, name, description ,price}: ProductDetailSelectorType) => {
  const [selectedColor, setSelectedColor] = useState(colorOptions[0]);
  const [quantity, setQuantity] = useState(1);
  const addToCart = useCartStore((state) => state.addToCart);
  const [isPending, startTransition] = useTransition();
  const router = useRouter()


 const addToCartHandler = async() => {

    startTransition(async () => {
        try {
            const result = await updateCartItem({
                productId: id,
                quantity: quantity,
            });
            
            toast(result.message);
            router.push("/cart");

            addToCart({
                productId: id,
                productName: name,
                color: selectedColor,
                quantity,
                price,
                description,
            });

        } catch (error: any) {
            toast(error.message || 'Failed to add item to cart');
        }
    });
};

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h2 className="text-lg font-semibold text-gray-800 mb-2">Color</h2>
        <div className="flex flex-wrap gap-3">
          {colorOptions.map((color, index) => (
            <button
              key={index}
              onClick={() => setSelectedColor(color)}
              className={`flex items-center gap-2 px-3 py-1.5 border rounded-full text-sm font-medium ${
                selectedColor === color
                  ? "border-blue-500 text-blue-600"
                  : "border-gray-300 text-gray-700 hover:border-blue-500"
              } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors`}
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

      <div className="flex gap-2 items-center">
        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Quantity</h2>
          <div className="flex items-center gap-3">
            <button
              className="bg-gray-200 text-gray-800 text-xl font-bold w-10 h-10 rounded-lg flex items-center justify-center hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Decrease quantity"
              disabled={quantity <= 1}
              onClick={() => setQuantity(quantity - 1)}
            >
              -
            </button>
            <input
              type="number"
              value={quantity}
              min={1}
              max={stock}
              className="w-16 text-center text-xl font-semibold border border-gray-300 rounded-lg py-1 px-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Product quantity"
              readOnly
            />
            <button
              className="bg-gray-200 text-gray-800 text-xl font-bold w-10 h-10 rounded-lg flex items-center justify-center hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Increase quantity"
              disabled={quantity >= stock}
              onClick={() => setQuantity(quantity + 1)}
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

      <div className="flex flex-col sm:flex-row gap-4">
        <button
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition transform hover:scale-105 active:scale-95 shadow-md"
          disabled={stock === 0 || isPending}
          onClick={addToCartHandler}
        >
          Add to Cart
        </button>
        <button
          className="flex-1 bg-black hover:bg-gray-800 text-white font-semibold px-6 py-3 rounded-xl transition transform hover:scale-105 active:scale-95 shadow-md"
          disabled={stock === 0}
        >
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default ProductDetailSelector;
