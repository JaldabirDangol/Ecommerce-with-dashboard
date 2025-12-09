'use server';

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { auth } from "@/app/auth";

export async function updateCartItem(data: {
  productId: string;
  quantity: number;
}) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("User not authenticated");
  }

  const userId = session.user.id;
  const { productId, quantity } = data;

  if (!productId || typeof quantity !== "number" || quantity < 1) {
    throw new Error("Invalid input");
  }

  try {
    let cart = await prisma.cart.findUnique({ where: { userId } });

    if (!cart) {
      cart = await prisma.cart.create({ data: { userId } });
    }

    const existingItem = await prisma.cartItem.findFirst({
      where: { cartId: cart.id, productId },
    });

    if (existingItem) {
      await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity },
      });
    } else {
      await prisma.cartItem.create({
        data: { cartId: cart.id, productId, quantity },
      });
    }

    revalidatePath("/cart");

    return { message: "Cart updated successfully", success: true };
  } catch (error) {
    const err = error as Error;
    console.error("Cart update failed:", err);
    throw new Error( "Failed to update cart");
  }
}


export async function deleteCartItem(cartItemId: string) {
    const session = await auth();
    if (!session?.user?.id) {
        throw new Error("Unauthorized");
    }
    const userId = session.user.id;
    
    if (!cartItemId) {
        throw new Error("CartItemId does not exist");
    }

    try {
        const cartItemToDelete = await prisma.cartItem.findUnique({
            where: { id: cartItemId },
            include: { cart: true },
        });

        if (!cartItemToDelete || cartItemToDelete.cart.userId !== userId) {
            throw new Error("Forbidden: You do not own this cart item");
        }

        await prisma.cartItem.delete({
            where: { id: cartItemId }
        });

        revalidatePath('/cart');
        return { message: "Item deleted successfully" };
    } catch (error) {
      const err = error as Error;
      console.error(err);
        throw new Error("Failed to delete item");
    }
}