"use server"

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(
    req: NextRequest,
    { params }: { params: { slug: string } }
) {
    try {
        const { slug } = params;

        console.log("got req in backend")

        if (!slug) {
            return NextResponse.json(
                { error: "Category slug is missing" },
                { status: 400 }
            );
        }

        const categoryWithProducts = await prisma.productCategory.findUnique({
            where: {
                slug: slug,
            },
            include: {
                products: true, 
            },
        });

        if (!categoryWithProducts) {
            return NextResponse.json(
                { error: "This category does not exist" },
                { status: 404 }
            );
        }

        if (categoryWithProducts.products.length === 0) {
            return NextResponse.json(
                { products: [], message: "This category does not have any products" },
                { status: 200 } 
            );
        }

        return NextResponse.json(
            { products: categoryWithProducts.products },
            { status: 200 }
        );
        
    } catch (error) {
        console.error("Error fetching products by category:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
