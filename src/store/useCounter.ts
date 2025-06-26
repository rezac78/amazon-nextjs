// store/useCartCount.ts
import {create} from "zustand";

interface CartCountStore {
 cartCount: number;
 increase: (qty: number) => void;
 decrease: (qty: number) => void;
 setCount: (qty: number) => void;
 reset: () => void;
}

export const useCartCount = create<CartCountStore>((set) => ({
 cartCount: 0,
 increase: (qty) => set((state) => ({cartCount: state.cartCount + qty})),
 decrease: (qty) => set((state) => ({cartCount: state.cartCount - qty})),
 setCount: (qty) => set({cartCount: qty}),
 reset: () => set({cartCount: 0}),
}));
