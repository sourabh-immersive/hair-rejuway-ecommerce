import { createAppSlice } from "@/lib/createAppSlice";
import type { AppThunk } from "@/lib/store";
import type { PayloadAction } from "@reduxjs/toolkit";
import { StaticImageData } from "next/image";

export interface WishlistItem {
  id: string;
  name: string;
  thumbnail: string | StaticImageData;
  price: number;
}

export interface WishlistSliceState {
  items: WishlistItem[];
  status: "idle" | "loading" | "failed";
}

const initialState: WishlistSliceState = {
  items: [],
  status: "idle",
};

export const wishlistSlice = createAppSlice({
  name: "wishlist",
  initialState,
  reducers: (create) => ({
    // Add item to wishlist (avoiding duplicates)
    addItemToWishlist: create.reducer(
      (state, action: PayloadAction<WishlistItem>) => {
        const existingItemIndex = state.items.findIndex(item => item.id === action.payload.id);
    
        if (existingItemIndex >= 0) {
          state.items.splice(existingItemIndex, 1);
        } else {
          state.items.push(action.payload);
        }
      }
    ),

    // Remove item from wishlist
    removeItemFromWishlist: create.reducer(
      (state, action: PayloadAction<string>) => {
        state.items = state.items.filter(item => item.id !== action.payload);
      }
    ),

    // Clear the wishlist
    clearWishlist: create.reducer((state) => {
      state.items = [];
    }),
  }),

  selectors: {
    getWishlistItems: (wishlist) => wishlist.items,
    getWishlistStatus: (wishlist) => wishlist.status,
    getIsItemInWishlist: (wishlist, itemId: string) =>
      wishlist.items.some(item => item.id === itemId),
  },
});

// Action creators
export const { addItemToWishlist, removeItemFromWishlist, clearWishlist } = wishlistSlice.actions;

// Selectors
export const { getWishlistItems, getWishlistStatus, getIsItemInWishlist } = wishlistSlice.selectors;

// Async thunk for conditional wishlist addition
export const addItemIfInStock = (item: WishlistItem): AppThunk => (dispatch, getState) => {
  // Here you could add async logic to check stock availability, etc.
  dispatch(addItemToWishlist(item));
};