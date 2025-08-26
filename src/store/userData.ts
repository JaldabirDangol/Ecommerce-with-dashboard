import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ProfileFormData } from "@/types/profileFormData";

interface UserDataState {
  user: ProfileFormData | null;
  updateUserDataStore: (newUserData: Partial<ProfileFormData>) => void;
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
          } as ProfileFormData,
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
