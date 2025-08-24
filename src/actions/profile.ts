"use server"

import { auth } from "@/app/auth"
import { prisma } from "@/lib/db";


export const updateUserData = async (
  prevState: { error?: string; success?: boolean; message?: string },
  formData: FormData
): Promise<{ error?: string; success?: boolean; message?: string }> => {
  try {
    const session = await auth();
     const userId = session?.user?.id;

    if (!session?.user?.id || !session?.user?.email) {
      return { error: "You are not logged in." };
    }

    const userDataToUpdate: {
      name?: string;
      email?: string;
      phoneNumber?: string;
    } = {};
    if (formData.get("name")) userDataToUpdate.name = formData.get("name") as string;
    if (formData.get("email")) userDataToUpdate.email = formData.get("email") as string;
    if (formData.get("phone")) userDataToUpdate.phoneNumber = formData.get("phone") as string;

    const addressDataToUpdate: {
      fullName?: string;
      city?: string;
      country?: string;
      postal?: string;
      phone?: string;
      street?: string;
    } = {};
    if (formData.get("fullName")) addressDataToUpdate.fullName = formData.get("fullName") as string;
    if (formData.get("city")) addressDataToUpdate.city = formData.get("city") as string;
    if (formData.get("country")) addressDataToUpdate.country = formData.get("country") as string;
    if (formData.get("postal")) addressDataToUpdate.postal = formData.get("postal") as string;
    if (formData.get("phone")) addressDataToUpdate.phone = formData.get("phone") as string;
    if (formData.get("street")) addressDataToUpdate.street = formData.get("street") as string;

    await prisma.$transaction(async (prisma) => {
      if (Object.keys(userDataToUpdate).length > 0) {
        await prisma.user.update({
          where: {
            email: session?.user?.email as string,
          },
          data: userDataToUpdate,
        });
      }

      const existingAddress = await prisma.address.findFirst({
        where: { userId: session?.user?.id },
      });

      if (Object.keys(addressDataToUpdate).length > 0) {
        await prisma.address.upsert({
          where: {
            id: existingAddress?.id ,
          },
          update: addressDataToUpdate,
          create: {
            userId: userId!,
            fullName: addressDataToUpdate.fullName || "",
            street: addressDataToUpdate.street || "",
            city: addressDataToUpdate.city || "",
            postal: addressDataToUpdate.postal || "",
            country: addressDataToUpdate.country || "",
            phone: addressDataToUpdate.phone || "",
          },
        });
      }
    });

    return { success: true, message: "Profile updated successfully." };
  } catch (error: any) {
    return { error: "Failed to update profile. Please try again." };
  }
};