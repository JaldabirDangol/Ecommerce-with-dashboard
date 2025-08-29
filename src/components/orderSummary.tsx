"use client";

import { useCartStore } from "@/store/cartStore";
import { CartItem } from "@/types/product";
import { ArrowRight } from "lucide-react";
import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const OrderSummary = () => {
  const items = useCartStore((state) => state.items);
  const [loading, setLoading] = useState(false);

  const selectedItems = items.filter((item: CartItem) => item.isSelected);

  const subTotal = selectedItems.reduce(
    (total: number, item: CartItem) => total + item.price * item.quantity,
    0
  );

  const shipping = 100;
  const voucherDiscount = 50;
  const total = subTotal + shipping - voucherDiscount;

  const handleCheckout = async () => {
    setLoading(true);
    try {
    const res = await fetch("/api/checkout-session", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ items: selectedItems }),
});

if (!res.ok) {
  console.error(await res.text());
  setLoading(false);
  return;
}

const session = await res.json();
const stripe = await stripePromise;
if (stripe && session.id) {
  await stripe.redirectToCheckout({ sessionId: session.id });
}

    } catch (err) {
      console.error("Checkout error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-[27%] bg-white p-6 rounded-lg shadow-md h-full">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Order Summary</h2>

      {/* Subtotal */}
      <div className="flex justify-between items-center text-lg mb-3">
        <p className="text-gray-700">Subtotal</p>
        <p className="font-semibold text-gray-800">Rs. {subTotal}</p>
      </div>

      {/* Voucher */}
      <div className="flex justify-between items-center text-md mb-3 text-green-600">
        <p>Voucher Discount</p>
        <p>- Rs. {voucherDiscount}</p>
      </div>

      {/* Shipping */}
      <div className="flex justify-between items-center mb-3">
        <p className="text-gray-700">Shipping</p>
        <p className="font-semibold text-gray-800">Rs. {shipping}</p>
      </div>

      <div className="flex justify-between border-t border-gray-300 pt-4 mt-4">
        <p className="font-bold text-xl text-gray-800">Total</p>
        <p className="font-bold text-xl text-blue-700">Rs. {total.toFixed(2)}</p>
      </div>

      <button
        onClick={handleCheckout}
        disabled={loading || selectedItems.length === 0}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg py-2 px-4 mt-4 rounded-lg shadow-md transition-all duration-200 flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 disabled:opacity-50"
      >
        {loading ? "Redirecting..." : "Proceed to Checkout"}
        <ArrowRight className="h-5 w-5" />
      </button>
    </div>
  );
};

export default OrderSummary;
