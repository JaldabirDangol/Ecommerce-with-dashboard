"use server";

import { prisma } from "@/lib/db";
import { auth } from "@/app/auth";
import { NextResponse } from "next/server";

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
        items: true,
      },
    });

    console.log("called",wishlist)

    return NextResponse.json(wishlist?.items || []);
  } catch (error) {
    console.error("Failed to fetch wishlist:", error);
    
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
};
