"use client"

import { useCartStore } from "@/store/cartStore";
import { CartItem } from "@/types/product";

const OrderSummary = () => {
  const items = useCartStore((state) => state.items);

  const selectedItems = items.filter((item: CartItem) => item.isSelected);

  console.log(selectedItems,"selectedfitems")

  const subTotal = selectedItems.reduce(
    (total: number, item: CartItem) => total + item.price * item.quantity,
    0
  );

  console.log(subTotal,"subtotal")

  const shipping = 100; 
  const voucherDiscount = 50;
  const total = subTotal + shipping - voucherDiscount;

  return (
    <div className="w-[27%] bg-white p-6 rounded-lg shadow-md h-full">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Order Summary</h2>

      <div className="flex justify-between items-center mb-3">
        <p className="text-gray-700">Shipping</p>
        <div className="flex items-center gap-3">
          <p className="font-semibold text-gray-800">Rs. {shipping}</p>
          <button className="text-blue-600 text-sm hover:underline font-medium">
            Change
          </button>
        </div>
      </div>

      <div className="flex justify-between items-center text-lg mb-3">
        <p className="text-gray-700">Subtotal</p>
        <p className="font-semibold text-gray-800">Rs. {subTotal}</p>
      </div>

      <div className="border-t border-b border-gray-200 py-4 my-4">
        <label htmlFor="voucher" className="block text-sm font-medium text-gray-700 mb-2">
          Have a voucher code?
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            id="voucher"
            placeholder="Enter code"
            className="flex-grow p-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
          />
          <button className="bg-blue-500 text-white py-2 px-5 rounded-md hover:bg-blue-600 transition duration-200 font-medium">
            Apply
          </button>
        </div>
      </div>

      <div className="flex justify-between items-center text-md mb-3 text-green-600">
        <p>Voucher Discount</p>
        <p>- Rs. {voucherDiscount}</p>
      </div>

      <div className="flex justify-between border-t border-gray-300 pt-4 mt-4">
        <p className="font-bold text-xl text-gray-800">Total</p>
        <p className="font-bold text-xl text-blue-700">Rs. {total.toFixed(2)}</p>
      </div>

      <button className="w-full bg-blue-600 text-white py-3 rounded-lg mt-6 hover:bg-blue-700 transition duration-200 text-lg font-semibold shadow-lg">
        Proceed to Checkout
      </button>
    </div>
  );
};

export default OrderSummary;
