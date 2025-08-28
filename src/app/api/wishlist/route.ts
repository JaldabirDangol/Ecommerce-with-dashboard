"use server";

import { prisma } from "@/lib/db";
import { auth } from "@/app/auth";
import { NextRequest, NextResponse } from "next/server";


export const POST = async (req: NextRequest) => {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const { productId } = await req.json();

    if (!productId) {
      return NextResponse.json({ error: "Product ID is required" }, { status: 400 });
    }

    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      return NextResponse.json(
        { error: `Product with ID ${productId} does not exist` },
        { status: 404 }
      );
    }

    const userId = session.user.id;

    const wishlist = await prisma.wishlist.findUnique({
      where: { userId },
    });

    if (wishlist) {
      await prisma.wishlist.update({
        where: { userId },
        data: {
          items: {
            create: { productId },
          },
        },
      });
    } else {
      await prisma.wishlist.create({
        data: {
          userId,
          items: {
            create: { productId },
          },
        },
      });
    }

    return NextResponse.json({ success: true, message: "Wishlist updated" }, { status: 200 });
  } catch (error) {
    console.error("Wishlist update failed:", error);
    return NextResponse.json(
      { error: `Updating wishlist item failed: ${(error as Error).message}` },
      { status: 500 }
    );
  }
};

export const GET = async () => {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const wishlist = await prisma.wishlist.findUnique({
      where: {
        userId: session.user.id,
      },
      include: {
        items:{
          include:{
            product:true
          }
        },
      },
    });

    console.log("called",wishlist?.items)

    return NextResponse.json(wishlist?.items || []);
  } catch (error) {
    console.error("Failed to fetch wishlist:", error);
    
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
};
