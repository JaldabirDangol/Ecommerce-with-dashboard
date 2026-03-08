import { auth } from "@/app/auth";
import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json([], { status: 200 });
    }

    const userCart = await prisma.cart.findUnique({
      where: { userId: session.user.id },
      include: {
        items: {
          include: { product: true },
        },
      },
    });

    return NextResponse.json(userCart?.items || []);
  } catch (error) {
    console.error("Error fetching cart:", error);
    return NextResponse.json([], { status: 500 });
  }
}
