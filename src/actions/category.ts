"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function createCategory(formData: FormData) {
  const name = formData.get("name")?.toString().trim();
  if (!name) {
    throw new Error("Category name is required");
  }


  await prisma.productCategory.create({
    data: {
         name:name,
         image:
         },
  });

  revalidatePath("/dashboard/categories");

  return { success: true };
}
