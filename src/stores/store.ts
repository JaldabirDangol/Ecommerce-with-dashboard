import { create } from 'zustand'
import { Product } from '@/types/product'

interface ProductFormStore{
    product:Product;
    setProduct:(product:Partial<Product>)=>void;
    resetProduct:()=>void;
}

const initialProduct: Product = {
  name: "",
  description: "",
  price: 1,
  stock: 1,
  category: "",
  images: [],
  brand: "",
  warrenty: "",
  dimensions: "",
  weight: "",
  colorOptions: [],
  material: "",
};

export const useProductFormStore = create<ProductFormStore>((set) => ({
  product: initialProduct,

  setProduct: (updatedProduct) =>
    set((state) => ({
      product: { ...state.product, ...updatedProduct },
    })),

  resetProduct: () => set({ product: initialProduct }),
}));
