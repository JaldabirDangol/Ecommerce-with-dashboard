"use server";
import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const products = await prisma.product.findMany({
      take: 30,
      orderBy: {
        id: "asc" 
      }
    });

    return NextResponse.json({ products }, { status: 200 });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
};
