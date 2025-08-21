"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth"; // Assuming you have an authentication solution

export async function addReview({
  productId,
  rating,
  description,
}: {
  productId: string;
  rating: number;
  description: string;
}) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("You must be logged in to leave a review.");
  }

  const userId = session.user.id;

  // You would typically add a check here to see if the user has purchased the product
  // For this example, we'll assume they have.

  try {
    await prisma.review.create({
      data: {
        userId,
        productId,
        rating,
        description,
      },
    });

    revalidatePath(`/product/${productId}`);
    return { success: true };
  } catch (error) {
    console.error("Failed to add review:", error);
    throw new Error("Failed to add review.");
  }
}