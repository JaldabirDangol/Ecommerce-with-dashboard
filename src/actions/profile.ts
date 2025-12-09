"use server";

import { auth } from "@/app/auth";
import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import {ProfileFormData} from "@/types/profileFormData"

export const updateUserData = async (
  prevState: { error?: string; success?: boolean; message?: string },
  data: ProfileFormData
): Promise<{
  error?: string;
  success?: boolean;
  message?: string;
  userData?: ProfileFormData;
}> => {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId || !session?.user?.email) {
      return { error: "You are not logged in." };
    }

    const user = await prisma.user.findUnique({
      where:{
        id:userId
      }
    })

    if(!user){
     return { error: "cannot find user" };
    }
    const userDataToUpdate: { name?: string; email?: string; phoneNumber?: string } = {};
    if (data.name) userDataToUpdate.name = data.name;
    if (data.email) userDataToUpdate.email = data.email;
    if (data.phoneNumber) userDataToUpdate.phoneNumber = data.phoneNumber;

    await prisma.user.update({
      where: { id: userId },
      data: userDataToUpdate,
    });

    const defaultAddressData = { ...data.defaultAddress, userId};

 let updatedDefaultAddress;
if (data.defaultAddress) {
  if (user.defaultAddressId) {
    updatedDefaultAddress = await prisma.address.update({
      where: { id: user.defaultAddressId },
      data: defaultAddressData ,
    });
  } else {
    updatedDefaultAddress = await prisma.address.create({
      data:defaultAddressData ,
    });
    await prisma.user.update({
      where: { id: userId },
      data: { defaultAddressId: updatedDefaultAddress.id },
    });
  }
}

 let updatedShippingAddress;
if (data.shippingAddress) {
  if (user.shippingAddressId) {
    updatedShippingAddress = await prisma.address.update({
      where: { id: user.shippingAddressId },
      data: { ...data.shippingAddress, userId },
    });
  } else {
    updatedShippingAddress = await prisma.address.create({
      data: { ...data.shippingAddress, userId },
    });
    await prisma.user.update({
      where: { id: userId },
      data: { shippingAddressId: updatedShippingAddress.id },
    });
  }
}

    const updatedUser = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        defaultAddress: true,
        shippingAddress: true,
      },
    });
    
    console.log(updatedUser, "updated user in backend");
    revalidatePath("/profile");

return {
  success: true,
  message: "Profile updated successfully.",
  userData: updatedUser as unknown as ProfileFormData,
};

  } catch (error) {
    console.error("Failed to update profile:", error as Error);
    return { error: "Failed to update profile. Please try again." };
  }
};

export const initialUserData = async () => {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return { error: "User is not authenticated", status: 401 };
    }

    const userData = await prisma.user.findUnique({
      where: {
        id: session.user.id
      },
      include: {
       defaultAddress:true,
       shippingAddress:true
      }
    });

    if (!userData) {
      return { error: "User not found in database", status: 404 };
    }
   
    console.log("userData",userData)
    return userData;

  } catch (error) {
    console.error("Error fetching user data:", error);
    return { error: "Failed to fetch user data", status: 500 };
  }
};
