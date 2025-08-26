export interface ProfileFormData {
  id?: string;
  email: string;
  name: string;
  username: string | null;
  phoneNumber: string | null;
  role?: string;
  image?: string | null;
  defaultAddressId?: string | null;
  shippingAddressId?: string | null;
  createdAt?: string;
  updatedAt?: string;
  defaultAddress: {
    street?: string;
    city?: string;
    postal?: string;
    country?: string;
    phone?: string;
  } | null;
  shippingAddress: {
    street?: string;
    city?: string;
    postal?: string;
    country?: string;
    phone?: string;
  } | null;
}
