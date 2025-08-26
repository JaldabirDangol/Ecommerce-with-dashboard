export interface ProfileFormData {
  name: string;
  email: string;
  phone: string;
  defaultAddress?: {
    street?: string;
    city?: string;
    postal?: string;
    country?: string;
    phone?: string;
  };
  shippingAddress?: {
    street?: string;
    city?: string;
    postal?: string;
    country?: string;
    phone?: string;
  };
}