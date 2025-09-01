"use server";

import { auth } from "@/app/auth";
import { prisma } from "@/lib/db";

export const GET = async () => {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return new Response(JSON.stringify([]), { status: 200 });
    }

    const orders = await prisma.order.findMany({
      where: { userId: session.user.id },
      include: { items: { include: { product: true } } },
      orderBy: { createdAt: "desc" },
    });
   
    console.log("ordersssss",orders)
    return new Response(JSON.stringify({ orders }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch orders" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
