import { NextResponse } from "next/server";
import Stripe from "stripe";
import { prisma } from "@/lib/db";
import { auth } from "@/app/auth";
import { revalidatePath } from "next/cache";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-08-27.basil",
});

async function getUserId(): Promise<string> {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Not authenticated");
  }

  return session.user.id;
}

export async function GET(
  req: Request,
  { params }: { params: Promise<{ sessionId: string }> }
) {
  try {
    const userId = await getUserId();
    const { sessionId } = await params;
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

    const amount = session.amount_total ?? 0;
    const currency = session.currency ?? "USD";

    // --- Create order if payment succeeded and not already created ---
    if (session.payment_status === "paid") {
      // Use payment_intent as a unique reference to avoid duplicate orders
      const paymentRef =
        typeof session.payment_intent === "string"
          ? session.payment_intent
          : sessionId;

      // Check if order was already created (by webhook or previous visit)
      const existingPayment = await prisma.payment.findFirst({
        where: {
          method: "STRIPE",
          userId,
          status: paymentRef,
        },
      });

      if (!existingPayment) {
        const total = amount / 100;

        const itemsToCreate = lineItems.data
          .map((item) => {
            const product = item.price?.product as Stripe.Product;
            const productId = product?.metadata?.productId;
            if (!productId) return null;
            return {
              productId,
              quantity: item.quantity ?? 1,
              priceAtPurchase: (item.price?.unit_amount ?? 0) / 100,
            };
          })
          .filter(
            (
              item
            ): item is {
              productId: string;
              quantity: number;
              priceAtPurchase: number;
            } => Boolean(item)
          );

        if (itemsToCreate.length > 0) {
          const order = await prisma.order.create({
            data: {
              userId,
              total,
              items: { create: itemsToCreate },
              payment: {
                create: {
                  method: "STRIPE",
                  status: paymentRef, // store payment_intent as dedup key
                  amount: total,
                  userId,
                },
              },
            },
            include: { items: true, payment: true },
          });

          await prisma.notification.create({
            data: {
              userId,
              type: "ORDER_PLACED",
              message: `Your order #${order.id} has been successfully placed.`,
              link: `/product/${order.items[0]?.productId}`,
            },
          });

          await prisma.notification.create({
            data: {
              userId,
              type: "PAYMENT_CONFIRMED",
              message: `Your payment of ${total} ${currency.toUpperCase()} has been successfully processed.`,
              link: `/orders/${session.id}`,
            },
          });

          revalidatePath("/dashboard");
        }
      }
    }

    return NextResponse.json({
      id: session.id,
      payment_status: session.payment_status,
      amount_total: session.amount_total,
      currency: session.currency,
      customer_email: session.customer_details?.email ?? null,
      line_items: lineItems.data.map((li) => {
        const product = li.price?.product;
        const name =
          product && typeof product === "object" && "name" in product
            ? product.name
            : li.description ?? "Item";
        return {
          id: li.id,
          name,
          quantity: li.quantity,
          amount_total: li.amount_total,
          amount_subtotal: li.amount_subtotal,
        };
      }),
      receipt_url: receiptUrl,
    });
  } catch (error) {
    const err = error as Error;
    console.error("GET /api/checkout-session/:id failed:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
