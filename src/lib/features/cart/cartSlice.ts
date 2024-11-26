import { createAppSlice } from "@/lib/createAppSlice";
import type { AppThunk } from "@/lib/store";
import type { PayloadAction } from "@reduxjs/toolkit";
import { StaticImageData } from "next/image";

export interface CartItem {
  id: string;
  name: string;
  thumbnail: string | StaticImageData,
  price: number;
  quantity: number;
}

export interface CartSliceState {
  items: CartItem[]; 
  totalAmount: number;
  totalItems: number;
  status: "idle" | "loading" | "failed";
}

const initialState: CartSliceState = {
  items: [],
  totalAmount: 0,
  totalItems: 0,
  status: "idle",
};

export const cartSlice = createAppSlice({
  name: "cart",
  initialState,
  reducers: (create) => ({
    addItemToCart: create.reducer(
      (state, action: PayloadAction<CartItem>) => {
        const itemIndex = state.items.findIndex(item => item.id === action.payload.id);

        if (itemIndex >= 0) {
          state.items[itemIndex].quantity += action.payload.quantity;
        } else {
          state.items.push({ ...action.payload });
        }

        state.totalItems += action.payload.quantity;
        state.totalAmount += action.payload.price * action.payload.quantity;
      }
    ),

    removeItemFromCart: create.reducer(
      (state, action: PayloadAction<string>) => {
        const itemIndex = state.items.findIndex(item => item.id === action.payload);

        if (itemIndex >= 0) {
          const item = state.items[itemIndex];
          state.totalItems -= item.quantity;
          state.totalAmount -= item.price * item.quantity;

          state.items.splice(itemIndex, 1);
        }
      }
    ),

    updateItemQuantity: create.reducer(
      (state, action: PayloadAction<{ id: string; quantity: number }>) => {
        const itemIndex = state.items.findIndex(item => item.id === action.payload.id);

        if (itemIndex >= 0) {
          const item = state.items[itemIndex];
          state.totalAmount += (action.payload.quantity - item.quantity) * item.price;
          state.totalItems += (action.payload.quantity - item.quantity);
          
          item.quantity = action.payload.quantity;
        }
      }
    ),

    clearCart: create.reducer((state) => {
      state.items = [];
      state.totalItems = 0;
      state.totalAmount = 0;
    }),
  }),
  selectors: {
    getCartItems: (cart) => cart.items,
    getTotalAmount: (cart) => cart.totalAmount,
    getTotalItems: (cart) => cart.totalItems,
    getCartStatus: (cart) => cart.status,
  },
});

// Action creators are generated for each case reducer function.
export const { addItemToCart, removeItemFromCart, updateItemQuantity, clearCart } = cartSlice.actions;

// Selectors returned by `slice.selectors` take the root state as their first argument.
export const { getCartItems, getTotalAmount, getTotalItems } = cartSlice.selectors;

// Example async thunk for adding item to cart conditionally based on some logic
export const addItemIfInStock = (item: CartItem): AppThunk => (dispatch, getState) => {
  // You could add some async API call logic here to check stock availability, etc.
  dispatch(addItemToCart(item));
};