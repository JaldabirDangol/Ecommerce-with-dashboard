import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { auth } from "@/app/auth";
import { revalidatePath } from "next/cache";

type OrderItemInput = {
  productId: string;
  quantity: number;
  priceAtPurchase: number;
};

export async function POST(req: Request) {
  try {
    const { pidx, items, total } = await req.json();

    if (!pidx) {
      return NextResponse.json(
        { message: "pidx is required" },
        { status: 400 }
      );
    }

    const res = await fetch(
      "https://dev.khalti.com/api/v2/epayment/lookup/",
      {
        method: "POST",
        headers: {
          Authorization: `Key ${process.env.KHALTI_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ pidx }),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(data, { status: 400 });
    }

    // Only create order if payment is completed
    if (data.status === "Completed") {
      const session = await auth();
      if (!session?.user?.id) {
        return NextResponse.json(
          { ...data, orderCreated: false, reason: "User not authenticated" },
          { status: 401 }
        );
      }

      // Validate items
      if (!items || !Array.isArray(items) || items.length === 0) {
        return NextResponse.json(
          { ...data, orderCreated: false, reason: "No order items provided" },
          { status: 400 }
        );
      }

      const orderTotal = total || data.total_amount / 100;

      const itemsToCreate = items
        .map((item: OrderItemInput) => {
          if (!item.productId) return null;
          return {
            productId: item.productId,
            quantity: item.quantity ?? 1,
            priceAtPurchase: item.priceAtPurchase ?? 0,
          };
        })
        .filter(Boolean) as {
        productId: string;
        quantity: number;
        priceAtPurchase: number;
      }[];

      if (itemsToCreate.length === 0) {
        return NextResponse.json(
          { ...data, orderCreated: false, reason: "No valid items to create" },
          { status: 400 }
        );
      }

      const order = await prisma.order.create({
        data: {
          userId: session.user.id,
          total: orderTotal,
          items: {
            create: itemsToCreate,
          },
          payment: {
            create: {
              method: "KHALTI",
              status: "PAID",
              amount: orderTotal,
              userId: session.user.id,
            },
          },
        },
        include: {
          items: true,
          payment: true,
        },
      });

      await prisma.notification.create({
        data: {
          userId: session.user.id,
          type: "ORDER_PLACED",
          message: `Your order #${order.id} has been successfully placed via Khalti.`,
          link: `/product/${order.items[0]?.productId}`,
        },
      });

      revalidatePath("/dashboard");

      return NextResponse.json({ ...data, orderCreated: true, orderId: order.id });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Khalti lookup error:", error);
    return NextResponse.json(
      { message: "Khalti lookup failed" },
      { status: 500 }
    );
  }
}
