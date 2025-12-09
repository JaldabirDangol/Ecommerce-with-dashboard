"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";

type LineItem = {
  id: string;
  name: string;
  quantity: number | null;
  amount_total: number | null;     // smallest unit
  amount_subtotal: number | null;  // smallest unit
};

type SessionDTO = {
  id: string;
  payment_status: "paid" | "unpaid" | "no_payment_required";
  amount_total: number | null;
  currency: string;
  customer_email: string | null;
  line_items: LineItem[];
  receipt_url: string | null;
};

export default function ResultPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const sessionId = searchParams.get("session_id");
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<SessionDTO | null>(null);
  const [error, setError] = useState<string | null>(null);

  const money = (amountSmallest: number | null | undefined, currency: string) => {
    if (amountSmallest == null) return "-";
    return new Intl.NumberFormat(undefined, {
      style: "currency",
      currency: currency.toUpperCase(),
    }).format(amountSmallest / 100);
  };

  useEffect(() => {
    if (!sessionId) {
      setError("Missing session_id in URL.");
      setLoading(false);
      return;
    }

    (async () => {
      try {
        const res = await fetch(`/api/checkout-session/${sessionId}`);
        if (!res.ok) {
          const text = await res.text();
          throw new Error(text || "Failed to fetch session.");
        }
        const data: SessionDTO = await res.json();
        setSession(data);
     } catch (err: unknown) {
    const error = err instanceof Error ? err : new Error("Failed to fetch session.");
    setError(error.message);
  } finally {
        setLoading(false);
      }
    })();
  }, [sessionId]);

  const isSuccess = session?.payment_status === "paid";

  const title = useMemo(() => {
    if (loading) return "Loading your order…";
    if (error) return "Something went wrong";
    return isSuccess ? "Payment Successful!" : "Payment Incomplete";
  }, [loading, error, isSuccess]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center gap-3 text-gray-700">
          <Loader2 className="w-6 h-6 animate-spin" />
          <span className="text-lg font-medium">Loading your order…</span>
        </div>
      </div>
    );
  }

  if (error || !session) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow p-8 text-center">
          <XCircle className="w-12 h-12 text-red-500 mx-auto mb-3" />
          <h1 className="text-2xl font-bold mb-2">{title}</h1>
          <p className="text-gray-600 mb-6">
            {error || "Unable to load your order details."}
          </p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => router.push("/cart")}
              className="px-5 py-2 rounded-lg bg-gray-100 hover:bg-gray-200"
            >
              Return to Cart
            </button>
            <button
              onClick={() => router.push("/")}
              className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow p-8">
        <div className="flex items-start gap-3 mb-6">
          {isSuccess ? (
            <CheckCircle className="w-10 h-10 text-green-600 mt-1" />
          ) : (
            <XCircle className="w-10 h-10 text-red-600 mt-1" />
          )}
          <div>
            <h1 className="text-2xl font-bold">
              {isSuccess ? "Payment Successful!" : "Payment Incomplete"}
            </h1>
            <p className="text-gray-600">
              {isSuccess
                ? `Thanks${session.customer_email ? `, ${session.customer_email}` : ""}! Your order is confirmed.`
                : "Your payment was not completed or was canceled."}
            </p>
          </div>
        </div>

        {/* Order Summary */}
        <div className="border rounded-xl p-4 mb-6">
          <h2 className="font-semibold mb-3">Order Summary</h2>
          <ul className="divide-y">
            {session.line_items.map((li) => (
              <li key={li.id} className="py-3 flex items-center justify-between">
                <div>
                  <p className="font-medium">{li.name}</p>
                  <p className="text-sm text-gray-500">Qty: {li.quantity ?? 1}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">
                    {money(li.amount_total, session.currency)}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <div className="flex justify-between mt-4 pt-4 border-t">
            <span className="font-semibold">Total</span>
            <span className="font-semibold">
              {money(session.amount_total, session.currency)}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-3">
          {isSuccess ? (
            <>
              {session.receipt_url && (
                <a
                  href={session.receipt_url}
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-2 rounded-lg bg-gray-100 hover:bg-gray-200"
                >
                  View Receipt
                </a>
              )}
              <button
                onClick={() => router.push("/")}
                className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
              >
                Continue Shopping
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => router.push("/cart")}
                className="px-5 py-2 rounded-lg bg-gray-100 hover:bg-gray-200"
              >
                Return to Cart
              </button>
              <button
                onClick={() => router.push("/checkout")}
                className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
              >
                Try Again
              </button>
            </>
          )}
        </div>

        {/* Meta */}
        <p className="text-xs text-gray-500 mt-6">
          Order ID: {session.id}
        </p>
      </div>
    </div>
  );
}
