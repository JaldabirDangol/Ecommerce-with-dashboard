import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { CartItem } from "@/types/product";

interface CartState {
  items: CartItem[];
  isSelected:(id:string)=>boolean;
  addToCart: (item: CartItem) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  toggleSelected:(productId:string)=>void;
}

export const useCartStore = create<CartState>()(
  persist(
    devtools(
      (set,get) => ({
        items: [],
       addToCart: (newItem: CartItem) =>
  set((state) => {
    const exists = state.items.find((i) => i.productId === newItem.productId);
    if (exists) {
      return {
        items: state.items.map((i) =>
          i.productId === newItem.productId
            ? { ...i, quantity: i.quantity + newItem.quantity }
            : i
        ),
      };
    }
    return { items: [...state.items, { ...newItem, isSelected: true }] }; 
  }),

        removeFromCart: (productId) =>
          set((state) => ({
            items: state.items.filter((item) => item.productId !== productId),
          })),
        clearCart: () => set(() => ({
          items: []
        })),

toggleSelected: (productId: string) =>
  set((state) => ({
    items: state.items.map((item) =>
      item.productId === productId
        ? { ...item, isSelected: !item.isSelected }
        : item
    ),
  })),

    isSelected: (id: string) => {
        return get().items.some((item) => item.productId === id);
      },


      }),
      {
        name: "cart-storage",
      }
    )
  )
);