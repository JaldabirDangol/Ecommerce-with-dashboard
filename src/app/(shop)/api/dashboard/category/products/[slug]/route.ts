import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

const PAGE_SIZE = 30;

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        const { slug } = await params;
        const { searchParams } = new URL(req.url);
        const page = Math.max(1, parseInt(searchParams.get("page") ?? "1", 10));

        if (!slug) {
            return NextResponse.json(
                { error: "Category slug is missing" },
                { status: 400 }
            );
        }

        const category = await prisma.productCategory.findUnique({
            where: { slug },
            select: { id: true, name: true, slug: true },
        });

        if (!category) {
            return NextResponse.json(
                { error: "This category does not exist" },
                { status: 404 }
            );
        }

        const products = await prisma.product.findMany({
            where: { categoryId: category.id },
            select: {
                id: true,
                name: true,
                price: true,
                images: true,
                stock: true,
                isPublished: true,
                rating: true,
            },
            skip: (page - 1) * PAGE_SIZE,
            take: PAGE_SIZE,
            orderBy: { createdAt: "desc" },
        });

        if (products.length === 0) {
            return NextResponse.json(
                { products: [], message: "This category does not have any products" },
                { status: 200 }
            );
        }

        return NextResponse.json({ products, page }, { status: 200 });
        
    } catch (error) {
        console.error("Error fetching products by category:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
