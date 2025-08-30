import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-08-27.basil",
});

export async function GET(
  req: Request,
  { params }: { params: Promise<{ sessionId: string }> }
) {
  try {
    const {sessionId} = await params;
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    const lineItems = await stripe.checkout.sessions.listLineItems(sessionId, {
      expand: ["data.price.product"],
      limit: 100,
    });

    let receiptUrl: string | null = null;
    if (typeof session.payment_intent === "string") {
      const pi = await stripe.paymentIntents.retrieve(session.payment_intent, {
        expand: ["latest_charge"],
      });
      const charge = pi.latest_charge;
      if (charge && typeof charge !== "string") {
        receiptUrl = charge.receipt_url ?? null;
      }
    }

    return NextResponse.json({
      id: session.id,
      payment_status: session.payment_status, 
      amount_total: session.amount_total,    
      currency: session.currency,
      customer_email: session.customer_details?.email ?? null,
      line_items: lineItems.data.map((li) => ({
        id: li.id,
        name:
          typeof li.price?.product === "object" && li.price?.product
            ? (li.price.product as any).name
            : li.description ?? "Item",
        quantity: li.quantity,
        amount_total: li.amount_total,     
        amount_subtotal: li.amount_subtotal,
      })),
      receipt_url: receiptUrl,
    });
  } catch (err: any) {
    console.error("GET /api/checkout-session/:id failed:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
