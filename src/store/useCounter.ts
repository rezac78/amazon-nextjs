import {create} from "zustand";
import {Product} from "@/utils/types";

interface StoreState {
 favorites: Product[];
 cart: Product[];
 addToFavorites: (product: Product) => void;
 removeFromFavorites: (productId: number) => void;
 addToCart: (product: Product) => void;
 removeFromCart: (productId: number) => void;
}

export const useStore = create<StoreState>((set, get) => ({
 favorites: [],
 cart: [],

 addToFavorites: (product) => {
  const current = get().favorites;
  if (!current.find((p) => p.id === product.id)) {
   set({favorites: [...current, product]});
  }
 },

 removeFromFavorites: (productId) => {
  set({favorites: get().favorites.filter((p) => p.id !== productId)});
 },

 addToCart: (product) => {
  const current = get().cart;
  if (!current.find((p) => p.id === product.id)) {
   set({cart: [...current, product]});
  }
 },

 removeFromCart: (productId) => {
  set({cart: get().cart.filter((p) => p.id !== productId)});
 },
}));
