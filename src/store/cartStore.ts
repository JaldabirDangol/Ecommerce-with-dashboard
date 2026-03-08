import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { CartItem } from "@/types/product";

interface CartItemBackend {
  id: string;
  quantity: number;
  product: {
    id: string;
    name: string;
    description: string | null;
    price: number;
    images: string[];
  };
}

interface CartState {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  toggleSelected: (productId: string) => void;
  selectAll: () => void;
  deselectAll: () => void;
  updateQuantity: (productId: string, quantity: number) => void;
  isItemSelected: (id: string) => boolean;
  setItems: (newItems: CartItem[]) => void;
  fetchAndSetCart: () => Promise<void>;
}

export const useCartStore = create<CartState>()(
  persist(
    devtools(
      (set, get) => ({
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

        clearCart: () => set(() => ({ items: [] })),

        toggleSelected: (productId: string) =>
          set((state) => ({
            items: state.items.map((item) =>
              item.productId === productId
                ? { ...item, isSelected: !item.isSelected }
                : item
            ),
          })),

        selectAll: () =>
          set((state) => ({
            items: state.items.map((item) => ({ ...item, isSelected: true })),
          })),

        deselectAll: () =>
          set((state) => ({
            items: state.items.map((item) => ({ ...item, isSelected: false })),
          })),

        updateQuantity: (productId: string, quantity: number) =>
          set((state) => ({
            items: state.items.map((item) =>
              item.productId === productId
                ? { ...item, quantity: Math.max(1, quantity) }
                : item
            ),
          })),

        isItemSelected: (id: string) => {
          return get().items.some((item) => item.productId === id && item.isSelected);
        },

        setItems: (newItems: CartItem[]) => set({ items: newItems }),

        fetchAndSetCart: async () => {
          try {
            const res = await fetch("/api/cart");
            if (!res.ok) return;
            const backendItems: CartItemBackend[] = await res.json();
            if (!Array.isArray(backendItems)) return;
            const transformed = backendItems.map((item) => ({
              productId: item.product.id,
              productName: item.product.name,
              price: item.product.price,
              quantity: item.quantity,
              isSelected: true,
              description: item.product.description,
              image: item.product.images?.[0],
            }));
            set({ items: transformed });
          } catch (error) {
            console.error("Failed to fetch cart:", error);
          }
        },
      }),
      { name: "cart-devtools" }
    ),
    {
      name: "cart-storage", // <-- persist options
    }
  )
);
