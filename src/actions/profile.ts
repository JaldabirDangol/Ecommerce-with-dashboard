"use server";

import { auth } from "@/app/auth";
import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { Address, User } from "@prisma/client";

export const updateUserData = async (
  prevState: { error?: string; success?: boolean; message?: string },
  data: SuccessUserData
): Promise<{
  error?: string;
  success?: boolean;
  message?: string;
  userData?: SuccessUserData;
}> => {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId || !session?.user?.email) {
      return { error: "You are not logged in." };
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return { error: "Cannot find user" };
    }

    const userDataToUpdate: { name?: string; email?: string; phoneNumber?: string } = {};
    if (data.name) userDataToUpdate.name = data.name;
    if (data.email) userDataToUpdate.email = data.email;
    if (data.phoneNumber) userDataToUpdate.phoneNumber = data.phoneNumber;

    await prisma.user.update({
      where: { id: userId },
      data: userDataToUpdate,
    });

    let updatedDefaultAddress;
    if (data.defaultAddress) {
      const { id, ...defaultAddressData } = data.defaultAddress; // remove id for create
      void id;
      if (user.defaultAddressId) {
        updatedDefaultAddress = await prisma.address.update({
          where: { id: user.defaultAddressId },
          data: { ...defaultAddressData, userId },
        });
      } else {
        updatedDefaultAddress = await prisma.address.create({
          data: { ...defaultAddressData, userId },
        });
        await prisma.user.update({
          where: { id: userId },
          data: { defaultAddressId: updatedDefaultAddress.id },
        });
      }
    }

    // --- Handle Shipping Address ---
    let updatedShippingAddress;
    if (data.shippingAddress) {
      const { id, ...shippingAddressData } = data.shippingAddress; // remove id for create
      void id;
      if (user.shippingAddressId) {
        updatedShippingAddress = await prisma.address.update({
          where: { id: user.shippingAddressId },
          data: { ...shippingAddressData, userId },
        });
      } else {
        updatedShippingAddress = await prisma.address.create({
          data: { ...shippingAddressData, userId },
        });
        await prisma.user.update({
          where: { id: userId },
          data: { shippingAddressId: updatedShippingAddress.id },
        });
      }
    }

    // --- Fetch updated user ---
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
      userData: updatedUser as SuccessUserData,
    };
  } catch (error) {
    console.error("Failed to update profile:", error as Error);
    return { error: "Failed to update profile. Please try again." };
  }
};

 

export type SuccessUserData = User & {
  defaultAddress: Address | null;
  shippingAddress: Address | null;
};

export type ErrorUserData = {
  status: "error";
  error: string;
};

export type initialUserDataType = SuccessUserData | ErrorUserData;

export const initialUserData = async (): Promise<initialUserDataType> => {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return { status: "error", error: "User is not authenticated" };
    }

    const userData = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: { defaultAddress: true, shippingAddress: true },
    });

    if (!userData) {
      return { status: "error", error: "User not found in database" };
    }

    return userData;
  } catch (error) {
    console.error("Error fetching user data:", error);
    return { status: "error", error: "Failed to fetch user data" };
  }
};
