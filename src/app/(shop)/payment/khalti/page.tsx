"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";

type LookupResult = {
  status: string;
  orderCreated?: boolean;
  orderId?: string;
  total_amount?: number;
  reason?: string;
  message?: string;
};

export default function KhaltiReturnPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState<LookupResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const pidx = searchParams.get("pidx");
    const status = searchParams.get("status");

    if (!pidx) {
      setError("Missing payment identifier (pidx).");
      setLoading(false);
      return;
    }

    if (status && status !== "Completed") {
      setError(`Payment was not completed. Status: ${status}`);
      setLoading(false);
      return;
    }

    // Retrieve saved cart items and total from localStorage
    const savedItems = localStorage.getItem("khalti_pending_items");
    const savedTotal = localStorage.getItem("khalti_pending_total");

    let items = [];
    let total = 0;
    try {
      items = savedItems ? JSON.parse(savedItems) : [];
      total = savedTotal ? parseFloat(savedTotal) : 0;
    } catch {
      // If parsing fails, proceed without items — the API will handle validation
    }

    (async () => {
      try {
        const res = await fetch("/api/khalti/lookup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ pidx, items, total }),
        });

        const data: LookupResult = await res.json();

        if (!res.ok) {
          setError(data.message || "Payment verification failed.");
          setLoading(false);
          return;
        }

        setResult(data);

        // Clean up localStorage
        localStorage.removeItem("khalti_pending_items");
        localStorage.removeItem("khalti_pending_total");
      } catch (err) {
        const e = err instanceof Error ? err : new Error("Failed to verify payment.");
        setError(e.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [searchParams]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center gap-3 text-gray-700">
          <Loader2 className="w-6 h-6 animate-spin" />
          <span className="text-lg font-medium">Verifying your payment...</span>
        </div>
      </div>
    );
  }

  if (error || !result) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow p-8 text-center">
          <XCircle className="w-12 h-12 text-red-500 mx-auto mb-3" />
          <h1 className="text-2xl font-bold mb-2">Payment Failed</h1>
          <p className="text-gray-600 mb-6">
            {error || "Unable to verify your payment."}
          </p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => router.push("/cart")}
              className="px-5 py-2 rounded-lg bg-gray-100 hover:bg-gray-200"
            >
              Return to Cart
            </button>
          </div>
        </div>
      </div>
    );
  }

  const isSuccess = result.status === "Completed" && result.orderCreated;

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow p-8 text-center">
        {isSuccess ? (
          <>
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-2">Payment Successful!</h1>
            <p className="text-gray-600 mb-2">
              Your Khalti payment has been confirmed and your order has been placed.
            </p>
            {result.total_amount && (
              <p className="text-lg font-semibold text-gray-800 mb-4">
                Amount Paid: Rs. {result.total_amount / 100}
              </p>
            )}
            <div className="flex gap-3 justify-center mt-4">
              <button
                onClick={() => router.push("/")}
                className="px-5 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700"
              >
                Continue Shopping
              </button>
              <button
                onClick={() => router.push("/profile")}
                className="px-5 py-2 rounded-lg bg-gray-100 hover:bg-gray-200"
              >
                View Orders
              </button>
            </div>
          </>
        ) : (
          <>
            <XCircle className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-2">Payment Incomplete</h1>
            <p className="text-gray-600 mb-6">
              {result.reason || "Your payment could not be verified. Please try again."}
            </p>
            <button
              onClick={() => router.push("/cart")}
              className="px-5 py-2 rounded-lg bg-gray-100 hover:bg-gray-200"
            >
              Return to Cart
            </button>
          </>
        )}
      </div>
    </div>
  );
}
