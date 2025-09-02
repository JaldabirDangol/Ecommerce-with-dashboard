import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { WishlistItem, WishlistItemBackend } from '@/types/product';

interface WishlistState {
  items: WishlistItem[];
  addToWishList: (item: WishlistItem) => void;
  removeFromWishList: (id: string) => void;
  fetchAndSetWishlist: () => void;
}

export const useWishListStore = create(
  persist<WishlistState>(
    (set) => ({
      items: [],

      addToWishList: (newItem) =>
        set((state) => {
          const exists = state.items.some((i) => i.id === newItem.id);
          if (exists) return state;
          return { items: [...state.items, newItem] };
        }),

      removeFromWishList: (id) =>
        set((state) => ({
          items: state.items.filter((i) => i.id !== id),
        })),

      fetchAndSetWishlist: async () => {
        try {
          const response = await fetch('/api/wishlist');
          if (!response.ok) throw new Error('Failed to fetch wishlist');

          const backendItems: WishlistItemBackend[] = await response.json();

          const mappedItems: WishlistItem[] = backendItems.map((item) => ({
            id: item.productId,
            name: item.product.name,
            price: item.product.price,
            image: item.product.images[0],
            description: item.product.description,
            dateAdded: item.product.dateAdded,
          }));

          set({ items: mappedItems });
        } catch (error) {
          console.error('Error fetching wishlist:', error);
        }
      },
    }),
    {
      name: 'wishlist-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
