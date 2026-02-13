"use client";

import { useCartStore } from "@/store/cartStore";
import { CartItem } from "@/types/product";
import { ArrowRight } from "lucide-react";
import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

const OrderSummary = () => {
  const items = useCartStore((state) => state.items);
  const [loading, setLoading] = useState(false);

  const selectedItems = items.filter((item: CartItem) => item.isSelected);

  const subTotal = selectedItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const shipping = subTotal ? 100 : 0;
  const voucherDiscount = subTotal ? 50 : 0;
  const total = subTotal + shipping - voucherDiscount;

  /* ---------------- STRIPE ---------------- */
  const handleStripeCheckout = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: selectedItems }),
      });

      if (!res.ok) {
        console.error(await res.text());
        return;
      }

      const session = await res.json();
      const stripe = await stripePromise;

      if (stripe && session.id) {
        await stripe.redirectToCheckout({ sessionId: session.id });
      }
    } catch (err) {
      console.error("Stripe error:", err);
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- KHALTI (KPG-2) ---------------- */
  const handleKhaltiCheckout = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/khalti/initiate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: total * 100, // paisa
          purchaseOrderId: "ORDER_" + Date.now(),
          purchaseOrderName: "E-commerce Order",
          customer: {
            name: "Test User",
            email: "test@example.com",
            phone: "9800000001",
          },
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error(data);
        alert("Failed to initiate Khalti payment");
        return;
      }

      // 🔥 Redirect to Khalti hosted checkout
      window.location.href = data.payment_url;
    } catch (err) {
      console.error("Khalti error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-[27%] bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

      <div className="flex justify-between mb-2">
        <span>Subtotal</span>
        <span>Rs. {subTotal}</span>
      </div>

      <div className="flex justify-between text-green-600 mb-2">
        <span>Voucher</span>
        <span>- Rs. {voucherDiscount}</span>
      </div>

      <div className="flex justify-between mb-4">
        <span>Shipping</span>
        <span>Rs. {shipping}</span>
      </div>

      <div className="flex justify-between font-bold text-xl border-t pt-4">
        <span>Total</span>
        <span>Rs. {total}</span>
      </div>

      {/* Stripe */}
      <button
        onClick={handleStripeCheckout}
        disabled={loading || selectedItems.length === 0}
        className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg flex justify-center gap-2 disabled:opacity-50"
      >
        {loading ? "Redirecting..." : "Pay with Card (Stripe)"}
        <ArrowRight className="w-5 h-5" />
      </button>

      {/* Khalti */}
      <button
        onClick={handleKhaltiCheckout}
        disabled={loading || selectedItems.length === 0}
        className="w-full mt-3 bg-purple-600 text-white py-2 rounded-lg disabled:opacity-50"
      >
        Pay with Khalti
      </button>
    </div>
  );
};

export default OrderSummary;
