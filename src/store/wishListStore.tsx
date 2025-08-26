import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { WishlistItem } from '@/types/product';

interface WishlistState {
  items: WishlistItem[];
  addToWishList: (item: WishlistItem) => void;
  removeFromWishList: (id: string) => void;
  fetchAndSetWishlist: () => void;
}

export const useWishListStore = create(
  persist<WishlistState>(
    (set, get) => ({
      items: [],
      addToWishList: (newItem) =>
        set((state) => {
          const exists = state.items.some((i) => i.id === newItem.id);
          if (exists) {
            return state;
          }
          return { items: [...state.items, newItem] };
        }),
      
      removeFromWishList: (id) =>
        set((state) => ({
          items: state.items.filter((i) => i.id !== id),
        })),

      fetchAndSetWishlist: async () => {
        try {
          const response = await fetch('/api/wishlist');
          if (!response.ok) {
            throw new Error('Failed to fetch wishlist');
          }
          const items = await response.json();
          set({ items });
        } catch (error) {
          console.error("Error fetching wishlist:", error);
        }
      },
    }),

    {
      name: 'wishlist-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);