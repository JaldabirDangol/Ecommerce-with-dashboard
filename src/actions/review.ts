"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { auth } from "@/app/auth"; // Assuming you have an authentication solution

interface AddReviewProps {
  productId: string;
  rating: number;
  description: string;
}

export async function addReview({ productId, rating, description }: AddReviewProps) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("You must be logged in to leave a review.");
  }

  const userId = session.user.id;

  try {
    // Check if the user has already reviewed this product
    const existingReview = await prisma.review.findFirst({
      where: {
        userId: userId,
        productId: productId,
      },
    });

    if (existingReview) {
      throw new Error("You have already submitted a review for this product.");
    }

    // Create the new review
    await prisma.review.create({
      data: {
        userId,
        productId,
        rating,
        description,
      },
    });

    // Revalidate the product page to show the new review immediately
    revalidatePath(`/product/${productId}`);
    return { success: true };
  } catch (error: any) {
    console.error("Failed to add review:", error);
    throw new Error(error.message || "Failed to add review. Please try again.");
  }
}