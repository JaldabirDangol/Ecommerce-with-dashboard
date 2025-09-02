import { NextResponse } from "next/server";
import { auth } from "@/app/auth";
import { prisma } from "@/lib/db";

export const DELETE = async () => {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json(
        { error: "User is not logged in" },
        { status: 401 }
      );
    }

    const userId = session.user.id;

const userOrders = await prisma.order.findMany({
  where: { userId },
  select: { id: true },
});
const orderIds = userOrders.map(o => o.id);

await prisma.payment.deleteMany({
  where: { orderId: { in: orderIds } },
});

await prisma.orderItem.deleteMany({
  where: { orderId: { in: orderIds } },
});

await prisma.order.deleteMany({
  where: { id: { in: orderIds } },
});

await prisma.review.deleteMany({ where: { userId } });

await prisma.address.deleteMany({ where: { userId } });

await prisma.cartItem.deleteMany({
  where: { cart: { userId } },
});

await prisma.cart.deleteMany({ where: { userId } });
await prisma.wishlistItem.deleteMany({
  where: { wishlist: { userId } },
});

await prisma.wishlist.deleteMany({ where: { userId } });

await prisma.account.deleteMany({ where: { userId } });
await prisma.session.deleteMany({ where: { userId } });

await prisma.user.delete({ where: { id: userId } });


    return NextResponse.json(
      { message: "Account and all related data deleted successfully" },
      { status: 200 }
    );

  } catch (error) {
    console.error("Error deleting account:", error);
    return NextResponse.json(
      { error: "Failed to delete account" },
      { status: 500 }
    );
  }
};
