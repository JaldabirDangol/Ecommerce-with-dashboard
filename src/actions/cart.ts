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

/** Add multiple items to the cart in a single round-trip (used by "Move All to Cart"). */
export async function batchAddToCart(items: { productId: string; quantity: number }[]) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("User not authenticated");

  const userId = session.user.id;

  if (!items.length) return { success: true, message: "Nothing to add" };

  let cart = await prisma.cart.findUnique({ where: { userId } });
  if (!cart) {
    cart = await prisma.cart.create({ data: { userId } });
  }

  // Fetch existing items for this cart in one query
  const existingItems = await prisma.cartItem.findMany({
    where: { cartId: cart.id, productId: { in: items.map((i) => i.productId) } },
    select: { id: true, productId: true },
  });

  const existingMap = new Map(existingItems.map((e) => [e.productId, e.id]));

  await prisma.$transaction([
    // Update existing items
    ...existingItems.map((e) =>
      prisma.cartItem.update({
        where: { id: e.id },
        data: { quantity: items.find((i) => i.productId === e.productId)?.quantity ?? 1 },
      })
    ),
    // Create new items in bulk
    prisma.cartItem.createMany({
      data: items
        .filter((i) => !existingMap.has(i.productId))
        .map((i) => ({ cartId: cart.id, productId: i.productId, quantity: i.quantity })),
      skipDuplicates: true,
    }),
  ]);

  revalidatePath("/cart");
  return { success: true, message: "All items added to cart" };
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
        // Use deleteMany with ownership check to avoid an extra round-trip
        const deleted = await prisma.cartItem.deleteMany({
            where: { id: cartItemId, cart: { userId } },
        });

        if (deleted.count === 0) {
            throw new Error("Forbidden: You do not own this cart item");
        }

        revalidatePath('/cart');
        return { message: "Item deleted successfully" };
    } catch (error) {
      const err = error as Error;
      console.error(err);
        throw new Error("Failed to delete item");
    }
}