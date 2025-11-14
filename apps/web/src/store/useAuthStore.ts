import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { IUser } from 'dto/web'

interface AuthState {
    user: IUser | null;
    isRehydrated: boolean;
    login: (user: IUser) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            isRehydrated: false,
            login: (user) => set({ user }),
            logout: () => set({ user: null }),
        }),
        {
            name: 'auth-storage',
            storage: createJSONStorage(() => localStorage),
            onRehydrateStorage: () => (state) => {
                if (state) state.isRehydrated = true;
            },
        }
    )
)
