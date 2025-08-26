"use server";

import { auth } from "@/app/auth";
import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

interface ProfileFormData {
  name?: string;
  email?: string;
  phone?: string;
  defaultAddress?: string;
  shippingAddress?: string;
}

interface ProfileFormData {
  name?: string;
  email?: string;
  phone?: string;
  defaultAddress?: string;
  shippingAddress?: string;
}

export const updateUserData = async (
  prevState: { error?: string; success?: boolean; message?: string },
  data: ProfileFormData
): Promise<{ error?: string; success?: boolean; message?: string }> => {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId || !session?.user?.email) {
      return { error: "You are not logged in." };
    }

    const userDataToUpdate: {
      name?: string;
      email?: string;
      phoneNumber?: string;
    } = {};

    if (data.name) userDataToUpdate.name = data.name;
    if (data.email) userDataToUpdate.email = data.email;
    if (data.phone) userDataToUpdate.phoneNumber = data.phone;
    
    const defaultAddressData = { street: data.defaultAddress };
    const shippingAddressData = { street: data.shippingAddress };

    await prisma.$transaction(async (tx) => {
      if (Object.keys(userDataToUpdate).length > 0) {
        await tx.user.update({
          where: { id: userId },
          data: userDataToUpdate,
        });
      }

      if (defaultAddressData.street) {
        const defaultAddressRecord = await tx.address.upsert({
          where: { 
            userId: userId, 
          },
          update: defaultAddressData,
          create: {
            userId: userId,
            ...defaultAddressData,
          },
        });
        
        await tx.user.update({
          where: { id: userId },
          data: { defaultAddressId: defaultAddressRecord.id },
        });
      }

      if (shippingAddressData.street) {
        const shippingAddressRecord = await tx.address.upsert({
          where: { 
            userId: userId, 
          },
          update: shippingAddressData,
          create: {
            userId: userId,
            ...shippingAddressData,
          },
        });
        
        await tx.user.update({
          where: { id: userId },
          data: { shippingAddressId: shippingAddressRecord.id },
        });
      }
    });

    revalidatePath("/profile");
    return { success: true, message: "Profile updated successfully." };
  } catch (error: any) {
    console.error("Failed to update profile:", error);
    return { error: "Failed to update profile. Please try again." };
  }
};