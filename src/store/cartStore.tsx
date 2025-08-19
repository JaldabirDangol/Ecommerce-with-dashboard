import { create } from "zustand";
import { devtools, persist } from "zustand/middleware"; // Import persist

interface CartItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  description: string;
  color: string;
}

interface CartState {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (productId: string) => void;
}

export const useCartStore = create(
  devtools<CartState>(
    persist( 
      (set) => ({
        items: [],
        addToCart: (newItem:CartItem) =>
          set((state) => {
            const exists = state.items.find(
              (i) => i.productId === newItem.productId
            );
            if (exists) {
              return {
                items: state.items.map((i) =>
                  i.productId === newItem.productId
                    ? { ...i, quantity: i.quantity + newItem.quantity }
                    : i
                ),
              };
            }
            return { items: [...state.items, newItem] };
          }),
        removeFromCart: (productId) =>
          set((state) => ({
            items: state.items.filter((item) => item.productId !== productId),
          })),
      }),
      {
        name: "cart-storage", 
      }
    )
  )
);