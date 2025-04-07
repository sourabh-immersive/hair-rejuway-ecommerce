import apiClient from "@/api/apiClient";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { StaticImageData } from "next/image";

export interface CartItemVariation {
  attribute_id: string;
  attribute_title: string;
  attribute_value: string;
}

export interface LocalCartItem {
  product_id: string;
  product_qty: string;
  variation: CartItemVariation[];
  price: string;
  key?: number;
  user_id?: string;
  id?: number;
  quantity?: number;
  product_type?: string;
  name?: string;
  product_image?: StaticImageData | string;
  prices?: {
    price?: number;
    regular_price: number;
    sale_price: number;
    currency_symbol?: string;
  };
}

export interface fullCart {
  items: CartItem[];
  coupons: string[];
  fees: string[];
  totals: {
    total_items: number;
    total_items_tax: number;
    total_fees: number;
    total_fees_tax: number;
    total_discount: number;
    total_discount_tax: number;
    total_shipping: number;
    total_shipping_tax: number;
    total_price: number;
    total_tax: number;
    tax_lines: {
      name: string;
      price: number;
      rate: string;
    }[];
    currency_code: string;
    currency_symbol: string;
    currency_minor_unit: number;
    currency_decimal_separator: string;
    currency_thousand_separator: string;
    currency_prefix: string;
    currency_suffix: string;
  };
  shipping_address: string[];
  billing_address: string[];
}

export interface CartItem {
  product_id: string;
  product_qty: string;
  variation: CartItemVariation[];
  key?: number;
  user_id?: string;
  id?: number;
  quantity?: string;
  product_type?: string;
  name?: string;
  product_image?: string;
  prices?: {
    price: string;
    regular_price: string;
    sale_price: string;
    currency_symbol: string;
  };
}

export interface CartState {
  items: CartItem[];
  localItems: LocalCartItem[];
  totalItems: number;
  localTotalItems: number;
  totalPrice: number;
  localTotalPrice: number;
  isLoading: boolean;
  error: string | null;
}

export const addToCartAsync2 = createAsyncThunk(
  "cart/addToCart",
  async (cartData: CartItem[], { getState, rejectWithValue }) => {
    const state = getState() as {
      auth: { status: string; user: { token: string } };
      cart: CartState;
    };

    try {
      const token = state.auth.user?.token;
      if (state.auth.status === "authenticated" && token) {
        const response = await apiClient.post("/user/addToCart", cartData, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("resposnse when addto cartt api simple item", response.data);
        return response.data.data;
      } else {
        return { items: cartData };
      }
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to add to cart");
    }
  }
);

export const removeFromCartAsync = createAsyncThunk(
  "cart/removeFromCart",
  async (cartItemKey: number, { getState, rejectWithValue }) => {
    const state = getState() as {
      auth: { status: string; user: { token: string } };
      cartB: CartState;
    };

    try {
      const token = state.auth.user?.token;
      if (state.auth.status === "authenticated" && token) {
        const response = await apiClient.post(
          "/user/removeFromCart",
          {
            cart_id: cartItemKey,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.data.status) {
          // Since API doesn't return updated cart, filter the item locally
          const updatedItems = state.cartB.items.filter(item => item.key !== cartItemKey);
          return { items: updatedItems };
        } else {
          throw new Error("Failed to remove item from cart");
        }
      } else {
        // For unauthenticated users, filter out the item locally
        const updatedItems = state.cartB.localItems.filter(item => Number(item.product_id) !== cartItemKey);
        // return { items: updatedItems };
      }
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to remove from cart");
    }
  }
);

export const clearCartAsync = createAsyncThunk(
  "cart/clearCart",
  async (_, { getState, rejectWithValue }) => {
    const state = getState() as {
      auth: { status: string; user: { token: string } };
      cart: CartState;
    };

    try {
      const token = state.auth.user?.token;
      if (state.auth.status === "authenticated" && token) {
        const response = await apiClient.post(
          "/user/cart-empty",
          [],
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.status) {
          // Return an empty cart on success
          return { items: [] };
        } else {
          throw new Error("Failed to clear cart");
        }
      } else {
        // For unauthenticated users, return an empty cart
        return { items: [] };
      }
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message || "Failed to clear cart");
    }
  }
);

export const syncCartWithServer = createAsyncThunk(
  "cart/syncCartWithServer",
  async (_, { getState, dispatch, rejectWithValue }) => {
    const state = getState() as {
      cartB: CartState;
      auth: { status: string; user: { token: string } };
    };

    try {
      const token = state.auth.user?.token;
      if (state.auth.status !== "authenticated" || !token) {
        return state.cartB.localItems; // Return current items if not authenticated
      }

      // 2. Get local cart items
      if (state.cartB.localItems.length > 0) {
        const localItems = state.cartB.localItems.map((item) => ({
          product_id: item.product_id,
          product_qty: item.product_qty,
          variation: item.variation,
        }));

        await dispatch(addToCartAsync2(localItems));
      }

      // 1. Get server cart
      const serverResponse = await apiClient.post(`/user/cartList`, [], {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const serverCart = serverResponse.data.data?.items || [];

      console.log("serverCart", serverCart);
      // state.cartB.items = [];
      // state.cartB.items.push(serverCart);

      return serverCart;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to sync cart"
      );
    }
  }
);

const initialState: CartState = {
  items: [],
  localItems: [],
  totalItems: 0,
  localTotalItems: 0,
  totalPrice: 0,
  localTotalPrice: 0,
  isLoading: false,
  error: null,
};

const cartBSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemLocally: (state, action: PayloadAction<LocalCartItem>) => {
      const existingItemIndex = state.localItems.findIndex(
        (item) =>
          item.product_id === action.payload.product_id &&
          JSON.stringify(item.variation) ===
            JSON.stringify(action.payload.variation)
      );

      if (existingItemIndex >= 0) {
        const newQty =
          Number(state.localItems[existingItemIndex].product_qty) +
          Number(action.payload.product_qty);
        state.localItems[existingItemIndex].product_qty = newQty.toString();
      } else {
        state.localItems.push(action.payload);
      }

      state.localTotalItems = state.localItems.reduce(
        (sum, item) => sum + Number(item.product_qty),
        0
      );
      state.localTotalPrice = state.localItems.reduce(
        (sum, item) =>
          sum + (Number(item.price) || 0) * Number(item.product_qty),
        0
      );
    },
    removeItem: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.key !== action.payload);
      state.totalItems = state.items.reduce(
        (sum, item) => sum + Number(item.product_qty),
        0
      );
      state.totalPrice = state.items.reduce(
        (sum, item) =>
          sum + (Number(item.prices?.price) || 0) * Number(item.product_qty),
        0
      );
    },
    removeItemLocally: (state, action: PayloadAction<number>) => {
      state.localItems = state.localItems.filter(
        (item) => Number(item.product_id) !== action.payload
      );
      state.localTotalItems = state.localItems.reduce(
        (sum, item) => sum + Number(item.product_qty),
        0
      );
      state.localTotalPrice = state.localItems.reduce(
        (sum, item) =>
          sum + (Number(item.price) || 0) * Number(item.product_qty),
        0
      );
    },
    clearCart: (state) => {
      state.items = [];
      state.totalItems = 0;
      state.totalPrice = 0;
    },
    clearCartLocally: (state) => {
      state.localItems = [];
      state.localTotalItems = 0;
      state.localTotalPrice = 0;
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ key: number; quantity: string }>
    ) => {
      const item = state.items.find((item) => item.key === action.payload.key);
      if (item) {
        item.product_qty = action.payload.quantity;
        item.quantity = action.payload.quantity;
        state.totalItems = state.items.reduce(
          (sum, item) => sum + Number(item.product_qty),
          0
        );
        state.totalPrice = state.items.reduce(
          (sum, item) =>
            sum + (Number(item.prices?.price) || 0) * Number(item.product_qty),
          0
        );
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCartAsync2.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addToCartAsync2.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload.items;
        state.totalItems =
          action.payload.totals?.total_items ||
          state.items.reduce((sum, item) => sum + Number(item.product_qty), 0);
        state.totalPrice =
          action.payload.totals?.total_price ||
          state.items.reduce(
            (sum, item) =>
              sum +
              (Number(item.prices?.price) || 0) * Number(item.product_qty),
            0
          );
        // Clear local items after successful server sync
        state.localItems = [];
        state.localTotalItems = 0;
        state.localTotalPrice = 0;
      })
      .addCase(addToCartAsync2.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(syncCartWithServer.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(syncCartWithServer.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log('action.payload', action.payload);
      
        // Assign items from payload, default to empty array if undefined
        state.items = action.payload || [];
        console.log('state.items after assignment', state.items);
      
        // Calculate totals with safeguards for invalid data
        state.totalItems = state.items.reduce((sum, item) => {
          const qty = Number(item.quantity) || 0; // Fallback to 0 if NaN or undefined
          return sum + qty;
        }, 0);
      
        state.totalPrice = state.items.reduce((sum, item) => {
          const price = Number(item.prices?.price) || 0; // Fallback to 0 if missing or NaN
          const qty = Number(item.quantity) || 0; // Fallback to 0 if NaN or undefined
          return sum + price * qty;
        }, 0);
      
        console.log('totalItems', state.totalItems);
        console.log('totalPrice', state.totalPrice);
      
        // Clear local items after successful sync
        state.localItems = [];
        state.localTotalItems = 0;
        state.localTotalPrice = 0;
      })
      .addCase(syncCartWithServer.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(removeFromCartAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(removeFromCartAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload?.items || [];
        state.totalItems = state.items.reduce(
          (sum, item) => sum + (Number(item.product_qty) || Number(item.quantity) || 0),
          0
        );
        state.totalPrice = state.items.reduce(
          (sum, item) => sum + (Number(item.prices?.price) || 0) * (Number(item.product_qty) || Number(item.quantity) || 0),
          0
        );
        state.error = null;
      })
      .addCase(removeFromCartAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(clearCartAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(clearCartAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload.items || [];
        state.totalItems = 0;
        state.totalPrice = 0;
        state.localItems = [];
        state.localTotalItems = 0;
        state.localTotalPrice = 0;
      })
      .addCase(clearCartAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  addItemLocally,
  removeItem,
  removeItemLocally,
  clearCart,
  clearCartLocally,
  updateQuantity,
} = cartBSlice.actions;
export default cartBSlice.reducer;
