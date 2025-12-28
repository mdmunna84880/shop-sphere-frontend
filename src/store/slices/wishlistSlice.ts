import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Product } from '../../types/product.types';

// 1. State
interface WishlistState {
  items: Product[];
}

// 2. Helper to load from Local Storage
const loadWishlistFromStorage = (): Product[] => {
  try {
    const serializedWishlist = localStorage.getItem("wishlistItems");
    if (serializedWishlist === null) return [];
    return JSON.parse(serializedWishlist);
  } catch (e) {
    console.warn("Could not load wishlist from local storage", e);
    return [];
  }
};

const initialState: WishlistState = {
  items: loadWishlistFromStorage(),
};

// 3. Slice
const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    // Toggle Wishlist Item (Add if new, Remove if exists - Optional UX)
    addToWishlist(state, action: PayloadAction<Product>) {
      const existingIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );

      // Only add if not already in wishlist
      if (existingIndex < 0) {
        state.items.push(action.payload);
        localStorage.setItem("wishlistItems", JSON.stringify(state.items));
      }
    },

    removeFromWishlist(state, action: PayloadAction<{ id: number }>) {
      state.items = state.items.filter(
        (item) => item.id !== action.payload.id
      );
      localStorage.setItem("wishlistItems", JSON.stringify(state.items));
    },

    clearWishlist(state) {
      state.items = [];
      localStorage.setItem("wishlistItems", JSON.stringify(state.items));
    }
  },
});

export const { addToWishlist, removeFromWishlist, clearWishlist } = wishlistSlice.actions;

export default wishlistSlice.reducer;