"use client";

import { useCartStore } from "@/store/cartStore";
import { CartItem } from "@/types/product";
import { useState } from "react";

const CheckoutPage = () => {
  const items = useCartStore((state) => state.items);
  const selectedItems = items.filter((item: CartItem) => item.isSelected);

  const subTotal = selectedItems.reduce(
    (total: number, item: CartItem) => total + item.price * item.quantity,
    0
  );
  const shipping = 100;
  const voucherDiscount = 50;
  const total = subTotal + shipping - voucherDiscount;

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    city: "",
    email: "",
    paymentMethod: "credit-card",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Placing order with the following details:", formData);
    alert("Order placed successfully! (This is a mock action)");
  };

  return (
    <div className="container mx-auto p-8 flex flex-col lg:flex-row gap-8">
      <div className="flex-1 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Checkout</h2>

        <form onSubmit={handlePlaceOrder}>
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Shipping Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Payment Method</h3>
            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  id="credit-card"
                  name="paymentMethod"
                  type="radio"
                  value="credit-card"
                  checked={formData.paymentMethod === "credit-card"}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <label htmlFor="credit-card" className="ml-3 block text-sm font-medium text-gray-700">Credit Card</label>
              </div>
              <div className="flex items-center">
                <input
                  id="paypal"
                  name="paymentMethod"
                  type="radio"
                  value="paypal"
                  checked={formData.paymentMethod === "paypal"}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <label htmlFor="paypal" className="ml-3 block text-sm font-medium text-gray-700">PayPal</label>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-200 text-lg font-semibold shadow-lg"
          >
            Place Order
          </button>
        </form>
      </div>

      <div className="w-full lg:w-[40%] bg-white p-6 rounded-lg shadow-md h-full">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Order Summary</h2>
        <div className="flex justify-between items-center text-lg mb-3">
          <p className="text-gray-700">Subtotal</p>
          <p className="font-semibold text-gray-800">Rs. {subTotal.toFixed(2)}</p>
        </div>
        <div className="flex justify-between items-center mb-3">
          <p className="text-gray-700">Shipping</p>
          <p className="font-semibold text-gray-800">Rs. {shipping.toFixed(2)}</p>
        </div>
        <div className="flex justify-between items-center text-md mb-3 text-green-600">
          <p>Voucher Discount</p>
          <p>- Rs. {voucherDiscount.toFixed(2)}</p>
        </div>
        <div className="border-t border-gray-300 pt-4 mt-4 flex justify-between">
          <p className="font-bold text-xl text-gray-800">Total</p>
          <p className="font-bold text-xl text-blue-700">Rs. {total.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;