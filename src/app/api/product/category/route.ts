"use server"

import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const name = formData.get("title")?.toString() as string;
    const image = formData.get("image")?.toString() as string;

    if (!name || !image) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }
   
    const ifAlreadyExists = await prisma.productCategory.findUnique({
            where:{
                name:name
            }
        
    })

    if (ifAlreadyExists) {
      return NextResponse.json({ error: "Category already exists" }, { status: 409 }); 
    }

    const category = await prisma.productCategory.create({
      data: {
        name,
        image,
      },
    });

   return NextResponse.json(
  { success: true, category, message: "New Category Created successfully...." },
  { status: 200 }
);

  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const categories = await prisma.product.findMany();
    return NextResponse.json(categories);
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 });
  }
}
