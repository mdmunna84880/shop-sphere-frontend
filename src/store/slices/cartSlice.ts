import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Product } from '../../types/product.types';

// 1. Cart Item & State
export interface CartItem extends Product {
  cartQuantity: number;
}

interface CartState {
  cartItems: CartItem[];
  cartTotalQuantity: number;
  cartTotalAmount: number;
}

// 2. Helper to load from Local Storage
const loadCartFromStorage = (): CartItem[] => {
  try {
    const serializedCart = localStorage.getItem("cartItems");
    if (serializedCart === null) return [];
    return JSON.parse(serializedCart);
  } catch (e) {
    console.warn("Could not load cart from local storage", e);
    return [];
  }
};

const initialState: CartState = {
  cartItems: loadCartFromStorage(),
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
};

// 3. Slice
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // A. Add to Cart (ONLY if new)
    addToCart(state, action: PayloadAction<Product>) {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );

      // Only add if it doesn't exist. If it exists, we do nothing.
      if (itemIndex < 0) {
        const tempProduct = { ...action.payload, cartQuantity: 1 };
        state.cartItems.push(tempProduct);
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      }
    },

    // B. Increase Quantity (+)
    increaseCart(state, action: PayloadAction<{ id: number }>) {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );

      if (itemIndex >= 0) {
        state.cartItems[itemIndex].cartQuantity += 1;
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      }
    },

    // C. Decrease Quantity (-)
    decreaseCart(state, action: PayloadAction<{ id: number }>) {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );

      if (state.cartItems[itemIndex].cartQuantity > 1) {
        state.cartItems[itemIndex].cartQuantity -= 1;
      } else if (state.cartItems[itemIndex].cartQuantity === 1) {
        state.cartItems = state.cartItems.filter(
          (item) => item.id !== action.payload.id
        );
      }
      
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    // D. Manual Quantity Input
    updateCartQuantity(state, action: PayloadAction<{ id: number; quantity: number }>) {
      const { id, quantity } = action.payload;
      const itemIndex = state.cartItems.findIndex((item) => item.id === id);

      if (itemIndex >= 0) {
        if (quantity > 0) {
          state.cartItems[itemIndex].cartQuantity = quantity;
        } else {
          state.cartItems = state.cartItems.filter((item) => item.id !== id);
        }
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      }
    },

    // E. Remove from Cart
    removeFromCart(state, action: PayloadAction<{ id: number }>) {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload.id
      );
      
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    // F. Clear Cart
    clearCart(state) {
      state.cartItems = [];
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    // G. Get Totals
    getTotals(state) {
      const { total, quantity } = state.cartItems.reduce(
        (cartTotal, cartItem) => {
          const { price, cartQuantity } = cartItem;
          const itemTotal = price * cartQuantity;

          cartTotal.total += itemTotal;
          cartTotal.quantity += cartQuantity;

          return cartTotal;
        },
        {
          total: 0,
          quantity: 0,
        }
      );

      state.cartTotalQuantity = quantity;
      state.cartTotalAmount = parseFloat(total.toFixed(2));
    },
  },
});

export const { 
  addToCart, 
  increaseCart, 
  decreaseCart, 
  updateCartQuantity, 
  removeFromCart, 
  clearCart, 
  getTotals 
} = cartSlice.actions;

export default cartSlice.reducer;