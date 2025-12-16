import { Address } from "@prisma/client";

export interface ProfileFormData {
  id?: string;
  email: string | null;
  name: string;
  username: string | null;
  phoneNumber: string | null;
  role?: string;
  image?: string | null;
  defaultAddressId?: string | null;
  shippingAddressId?: string | null;
  createdAt?: string;
  updatedAt?: string;
  defaultAddress: Address | null
  shippingAddress:Address | null
}
