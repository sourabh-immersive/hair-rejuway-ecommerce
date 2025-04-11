import apiClient from "@/api/apiClient";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { StaticImageData } from "next/image";

// Interface for wishlist items (server-side)
export interface WishlistItem {
  product_id: string;
  id?: number;
  user_id?: string;
  name?: string; // Optional for display
  product_image?: string; // Optional for display
}

// Interface for local wishlist items
export interface LocalWishlistItem {
  product_id: string;
  name?: string; // Optional for display
  product_image?: string; // Optional for display
}

// Wishlist state interface
export interface WishlistState {
  items: WishlistItem[];
  localItems: LocalWishlistItem[];
  totalItems: number;
  localTotalItems: number;
  isLoading: boolean;
  error: string | null;
}

// Async thunk to add item to wishlist
export const addToWishlistAsync = createAsyncThunk(
  "wishlist/addToWishlist",
  async (productId: string, { getState, rejectWithValue }) => {
    const state = getState() as {
      auth: { status: string; user: { token: string } };
      wishlist: WishlistState;
    };

    try {
      const token = state.auth.user?.token;
      if (state.auth.status === "authenticated" && token) {
        const response = await apiClient.post(
          "/user/wishlist/add",
          { product_id: productId },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.status) {
          const message = response.data.data[0].message.toLowerCase();
          const isAdded = message.includes("added");
          const currentItems = state.wishlist.items;
          if (isAdded) {
            return { product_id: productId }; // Add item
          } 
        }
      } else {
        return { product_id: productId }; // Local add
      }
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to toggle wishlist");
    }
  }
);

// Async thunk to remove item from wishlist
export const removeFromWishlistAsync = createAsyncThunk(
  "wishlist/removeFromWishlist",
  async (productId: string, { getState, rejectWithValue }) => {
    const state = getState() as {
      auth: { status: string; user: { token: string } };
      wishlist: WishlistState;
    };

    try {
      const token = state.auth.user?.token;
      if (state.auth.status === "authenticated" && token) {
        const response = await apiClient.get(
          `/user/wishlist/remove/${productId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.data.status) {
          const updatedItems = state.wishlist.items.filter(
            (item) => item.product_id !== productId
          );
          return { items: updatedItems };
        } else {
          throw new Error("Failed to remove item from wishlist");
        }
      } else {
        const updatedItems = state.wishlist.localItems.filter(
          (item) => item.product_id !== productId
        );
        return { items: updatedItems };
      }
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to remove from wishlist"
      );
    }
  }
);

// Async thunk to clear wishlist
export const clearWishlistAsync = createAsyncThunk(
  "wishlist/clearWishlist",
  async (_, { getState, rejectWithValue }) => {
    const state = getState() as {
      auth: { status: string; user: { token: string } };
      wishlist: WishlistState;
    };

    try {
      const token = state.auth.user?.token;
      if (state.auth.status === "authenticated" && token) {
        const response = await apiClient.post(
          "/user/wishlist-empty",
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.data.status) {
          return { items: [] };
        } else {
          throw new Error("Failed to clear wishlist");
        }
      } else {
        return { items: [] };
      }
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to clear wishlist"
      );
    }
  }
);

// Async thunk to sync wishlist with server
export const syncWishlistWithServer = createAsyncThunk(
  "wishlist/syncWishlistWithServer",
  async (_, { getState, dispatch, rejectWithValue }) => {
    const state = getState() as {
      wishlist: WishlistState;
      auth: { status: string; user: { token: string } };
    };

    try {
      const token = state.auth.user?.token;
      if (state.auth.status !== "authenticated" || !token) {
        return state.wishlist.localItems;
      }

      // Sync local wishlist items to server
      if (state.wishlist.localItems.length > 0) {
        for (const item of state.wishlist.localItems) {
          await dispatch(addToWishlistAsync(item.product_id));
        }
      }

      // Fetch server wishlist
      const serverResponse = await apiClient.get(
        "/user/wishlists",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const serverWishlist = serverResponse.data.data?.items || [];
      return serverWishlist;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to sync wishlist"
      );
    }
  }
);

// Initial state
const initialState: WishlistState = {
  items: [],
  localItems: [],
  totalItems: 0,
  localTotalItems: 0,
  isLoading: false,
  error: null,
};

// Wishlist slice
const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addItemLocally: (state, action: PayloadAction<LocalWishlistItem>) => {
      const existingItem = state.localItems.find(
        (item) => item.product_id === action.payload.product_id
      );

      if (!existingItem) {
        state.localItems.push(action.payload);
        state.localTotalItems = state.localItems.length;
      }
    },
    removeItemLocally: (state, action: PayloadAction<string>) => {
      state.localItems = state.localItems.filter(
        (item) => item.product_id !== action.payload
      );
      state.localTotalItems = state.localItems.length;
    },
    clearWishlistLocally: (state) => {
      state.localItems = [];
      state.localTotalItems = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToWishlistAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addToWishlistAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items.push(action.payload as WishlistItem);
        state.totalItems = state.items.length;
        state.localTotalItems = state.localItems.length;
      })
      .addCase(addToWishlistAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(removeFromWishlistAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(removeFromWishlistAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload.items || [];
        state.totalItems = state.items.length;
        state.localItems = state.localItems.filter(
          (item) => !state.items.some((i) => i.product_id === item.product_id)
        );
        state.localTotalItems = state.localItems.length;
      })
      .addCase(removeFromWishlistAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(clearWishlistAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(clearWishlistAsync.fulfilled, (state) => {
        state.isLoading = false;
        state.items = [];
        state.localItems = [];
        state.totalItems = 0;
        state.localTotalItems = 0;
      })
      .addCase(clearWishlistAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(syncWishlistWithServer.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(syncWishlistWithServer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload || [];
        state.totalItems = state.items.length;
        state.localItems = [];
        state.localTotalItems = 0;
      })
      .addCase(syncWishlistWithServer.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

// Export actions and reducer
export const { addItemLocally, removeItemLocally, clearWishlistLocally } =
  wishlistSlice.actions;
export default wishlistSlice.reducer;