import { NextResponse } from "next/server";
import Stripe from "stripe";
import { prisma } from "@/lib/db";
import { headers } from "next/headers";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-08-27.basil", // use stable API
});


export async function POST(req: Request) {
  const body = await req.text();
  const headerList = headers();
  const sig = (await headerList).get("stripe-signature");

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig!,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    console.error("❌ Webhook signature failed:", err.message);
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    if (!session.customer_email) {
      console.warn("❌ No customer email, skipping order creation.");
      return new NextResponse("No customer email", { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.customer_email },
    });

    if (!user) {
      console.error("❌ No user found for email:", session.customer_email);
      return new NextResponse("User not found", { status: 404 });
    }

    // Fetch line items and expand product data
    const lineItems = await stripe.checkout.sessions.listLineItems(session.id, {
      expand: ["data.price.product"],
    });

    const total = (session.amount_total ?? 0) / 100;

    // Safely create order items, skipping missing metadata
   const itemsToCreate = lineItems.data
  .map(item => {
    const product = item.price?.product as Stripe.Product;
    const productId = product?.metadata?.productId;

    if (!productId) {
      console.warn("Skipping product with missing metadata:", product?.name);
      return null;
    }

    return {
      productId,
      quantity: item.quantity ?? 1,
      priceAtPurchase: (item.price?.unit_amount ?? 0) / 100,
    };
  })
  .filter((item): item is { productId: string; quantity: number; priceAtPurchase: number } => Boolean(item));


   const order = await prisma.order.create({
  data: {
    userId: user.id,
    total,
    items: {
      create: itemsToCreate,
    },
    payment: {
      create: {
        method: "STRIPE",
        status: session.payment_status || "PAID",
        amount: total,
      },
    },
  },
  include: {
    items: true,
    payment: true,
  },
});


    console.log("✅ Order saved:", order);
  }

  return NextResponse.json({ received: true });
}
