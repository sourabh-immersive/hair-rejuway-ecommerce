import { createAppSlice } from "@/lib/createAppSlice";
import type { AppThunk } from "@/lib/store";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface CartItem {
  id: string;
  name: string;
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
    // Add item to cart, increment quantity if item already exists
    addItemToCart: create.reducer(
      (state, action: PayloadAction<CartItem>) => {
        const itemIndex = state.items.findIndex(item => item.id === action.payload.id);

        if (itemIndex >= 0) {
          // If item exists, update quantity
          state.items[itemIndex].quantity += action.payload.quantity;
        } else {
          // If item doesn't exist, add new item to cart
          state.items.push({ ...action.payload });
        }

        // Update total items and total amount
        state.totalItems += action.payload.quantity;
        state.totalAmount += action.payload.price * action.payload.quantity;
      }
    ),

    // Remove item from cart by its ID
    removeItemFromCart: create.reducer(
      (state, action: PayloadAction<string>) => {
        const itemIndex = state.items.findIndex(item => item.id === action.payload);

        if (itemIndex >= 0) {
          const item = state.items[itemIndex];
          // Update total items and amount before removing
          state.totalItems -= item.quantity;
          state.totalAmount -= item.price * item.quantity;

          // Remove item from array
          state.items.splice(itemIndex, 1);
        }
      }
    ),

    // Update item quantity in the cart
    updateItemQuantity: create.reducer(
      (state, action: PayloadAction<{ id: string; quantity: number }>) => {
        const itemIndex = state.items.findIndex(item => item.id === action.payload.id);

        if (itemIndex >= 0) {
          const item = state.items[itemIndex];
          // Update total amount and total items
          state.totalAmount += (action.payload.quantity - item.quantity) * item.price;
          state.totalItems += (action.payload.quantity - item.quantity);
          
          // Update quantity of the item
          item.quantity = action.payload.quantity;
        }
      }
    ),

    // Clear the cart (e.g., after checkout)
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