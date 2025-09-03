"use server"

import { prisma } from "@/lib/db";
import { auth } from "@/app/auth";

export const getOrderCount = async () => {
  try {
    const session = await auth();
    if (!session?.user?.id) return 0;

    const count = await prisma.order.count({
      where: { userId: session.user.id },
    });

    return count;
  } catch (error) {
    console.error("Error fetching order count:", error);
    return 0;
  }
};



export const getCustomerListForAdmin = async () => {
  try {
    const session = await auth();
    if (!session) {
      throw new Error("Not authenticated");
    }

    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        orders: {
          select: {
            createdAt: true,
          },
          orderBy: { createdAt: "desc" }, 
        },
      },
    });

    const customers = users.map(user => ({
      id: user.id,
      name: user.name || "",
      email: user.email,
      status: "Active", 
      lastOrder: user.orders.length > 0 
        ? user.orders[0].createdAt.toISOString().split("T")[0] 
        : null,
      totalOrders: user.orders.length,
    }));

    return customers;
  } catch (error) {
    console.error("Error fetching customers:", error);
    return [];
  }
};


export const latestOrderItem = async () => {
  try {
    const session = await auth();
    if (!session) throw new Error("Not authenticated");

    const orders = await prisma.order.findMany({
      orderBy: { createdAt: "desc" },
      take: 10, 
      select: {
        id: true,
        user: { select: { name: true } },
        total: true,
        items: { select: { status: true } },
        updatedAt: true,
      },
    });

    const sales = orders.map((order) => ({
      id: order.id,
      customerName: order.user.name,
      date: order.updatedAt.toISOString().split("T")[0],
      status:
        order.items.length > 0
          ? order.items[0].status 
          : "Processing", 
      amount: order.total,
    }));

    console.log(sales, "Transformed sales");
    return sales;
  } catch (error) {
    console.error(error);
    return [];
  }
};
