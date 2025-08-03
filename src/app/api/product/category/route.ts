"use server"

import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

function generateSlug(name) {
  return name
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')     // Replace spaces with hyphens
    .replace(/[^\w\-]+/g, '') // Remove all non-word chars except hyphen
    .replace(/\-\-+/g, '-');  // Replace multiple hyphens with single
}

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

    const slug = generateSlug(name); 
const category = await prisma.productCategory.create({
  data: {
    name,
    image,
    slug,
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
    const categories = await prisma.productCategory.findMany();
    return NextResponse.json(categories);
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 });
  }
}
