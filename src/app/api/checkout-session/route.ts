import { auth } from "@/app/auth";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-08-27.basil", // use stable API
});

export async function POST(req: Request) {
  const session = await auth();

  try {
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "User not authenticated" },
        { status: 401 }
      );
    }

    const { items } = await req.json();
    if (!items || items.length === 0) {
      throw new Error("No items provided");
    }

    // Build line items for Stripe
    const line_items = items.map((item: any) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.productName,
          metadata: { productId: item.id }, // your internal ID
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }));

    // Create Stripe checkout session
    const checkoutSession = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      customer_email: session.user.email,
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/result?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cart`,
    });

    return NextResponse.json({ id: checkoutSession.id });
  } catch (err: any) {
    console.error("Stripe checkout error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
