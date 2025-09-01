"use server"

import { prisma } from "@/lib/db";
import { auth } from "@/app/auth";

export const getOrderCount = async () => {
  try {
    const session = await auth();
    if (!session?.user?.id) return 0;

    // Count the orders
    const count = await prisma.order.count({
      where: { userId: session.user.id },
    });

    return count;
  } catch (error) {
    console.error("Error fetching order count:", error);
    return 0;
  }
};
