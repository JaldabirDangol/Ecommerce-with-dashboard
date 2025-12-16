import { create } from "zustand";
import { persist } from "zustand/middleware";
import { SuccessUserData } from "@/actions/profile";

interface UserDataState {
  user: SuccessUserData | null;
  updateUserDataStore: (newUserData: Partial<SuccessUserData>) => void;
  clearUserData: () => void;
}

export const useUserStore = create<UserDataState>()(
  persist(
    (set) => ({
      user: null,

      updateUserDataStore: (newUserData) => {
        set((state) => ({
          user: {
            ...(state.user ?? {}), 
            ...newUserData,
          } as SuccessUserData,
        }));
      },

      clearUserData: () => set({ user: null }),
    }),
    {
      name: "user-storage",
      partialize: (state) => ({
        user: state.user,
      }),
    }
  )
);
