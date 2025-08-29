import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-08-27.basil",
});

const CURRENCY = "usd";

// Stripe needs smallest unit (cents for USD)
function formatAmountForStripe(amount: number, currency: string): number {
  return Math.round(amount * 100);
}

export async function POST(req: Request) {
  try {
    const { items } = await req.json();
    if (!items || items.length === 0) throw new Error("No items provided");

    const line_items = items.map((item: any) => ({
      price_data: {
        currency: "usd",
        product_data: { name: item.productName },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/result?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cart`,

    });

    return NextResponse.json({ id: session.id });
  } catch (err: any) {
    console.error("Stripe checkout error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
