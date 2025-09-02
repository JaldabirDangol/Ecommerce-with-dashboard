"use server"

import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";


interface RouteParams {
  params: {
    id: string;
  };
}

export async function GET(request: Request, { params }: RouteParams) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json({ error: "Product ID is required" }, { status: 400 });
    }

    const product = await prisma.product.findUnique({
      where: {
        id: id,
      },
    });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(product, { status: 200 });
    
  } catch (error) {
    console.error("Error fetching product:", error);

    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
