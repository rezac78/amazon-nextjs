// store/useAuth.ts
import {create} from "zustand";

interface AuthState {
 isLoggedIn: boolean;
 setLoggedIn: (status: boolean) => void;
}

export const useAuth = create<AuthState>((set) => ({
 isLoggedIn: false,
 setLoggedIn: (status) => set({isLoggedIn: status}),
}));
