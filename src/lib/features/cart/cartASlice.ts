import apiClient from "@/api/apiClient";
import { RootState } from "@/lib/store";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

// API Response Types
interface Variation {
  attribute_id: number | string;
  attribute_title: string;
  attribute_value: string;
}

interface Prices {
  price: string;
  regular_price: string;
  sale_price: string;
  price_range: null | string;
  currency_code: string;
  currency_symbol: string;
  currency_minor_unit: number;
  currency_decimal_separator: string;
  currency_thousand_separator: string;
  currency_prefix: string;
  currency_suffix: string;
}

export interface CartItem {
  key?: number;
  user_id?: string;
  id: number;
  quantity: string;
  product_type?: string;
  name: string;
  short_description?: string;
  description?: string;
  sku?: string;
  low_stock_remaining?: string;
  backorders_allowed?: string;
  images?: string[];
  product_image: string;
  prices: Prices;
  variation: Variation[];
}

interface CartData {
  items: CartItem[];
  coupons: string[];
  fees: string[];
  totals: {
    total_items: number;
    total_price: number;
    currency_code: string;
    currency_symbol: string;
  };
  shipping_address: string[];
  billing_address: string[];
}

interface ApiResponse {
  status: boolean;
  data: CartData;
  error: any[];
}

interface RemoveCartResponse {
  status: boolean;
  data: {
    message: string;
  };
  error: any[];
}

// Request Types
export interface CartItemApi {
  product_id: string;
  product_qty: string;
  variation: Variation[];
}

interface RemoveCartRequest {
  cart_id: number;
}

// State Interface
interface CartAState {
  items: CartData;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  isLoggedIn: boolean;
}

// Initial state with full CartData structure
const initialCartData: CartData = {
  items: [],
  coupons: [],
  fees: [],
  totals: {
    total_items: 0,
    total_price: 0,
    currency_code: "USD",
    currency_symbol: "$"
  },
  shipping_address: [],
  billing_address: []
};

export const addToCartAsync = createAsyncThunk<
  CartData,
  CartItemApi[],
  { state: RootState; rejectValue: string }
>(
  "cartA/addToCart",
  async (cartData: CartItemApi[], { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.user?.token;
      const response = await apiClient.post<ApiResponse>(
        "/user/addToCart",
        cartData,
        {
          headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
          },
        }
      );
      if (!response.data.status) {
        throw new Error("Failed to add to cart");
      }
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Unknown error"
      );
    }
  }
);

export const removeFromCartAsync = createAsyncThunk<
  number, // Return the cart_id that was removed
  RemoveCartRequest,
  { state: RootState; rejectValue: string }
>(
  "cartA/removeFromCart",
  async (removeData: RemoveCartRequest, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.user?.token;
      const response = await apiClient.post<RemoveCartResponse>(
        "/user/removeFromCart",
        removeData,
        {
          headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
          },
        }
      );

      if (!response.data.status) {
        throw new Error("Failed to remove from cart");
      }

      return removeData.cart_id; // Return the cart_id to identify which item to remove from state
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Unknown error"
      );
    }
  }
);

const cartASlice = createSlice({
  name: "cartA",
  initialState: {
    items: initialCartData,
    status: "idle",
    error: null,
    isLoggedIn: false,
  } as CartAState,
  reducers: {
    addToLocalCart: (state, action: PayloadAction<CartItem>) => {
      const newItem = action.payload;
      const existingItemIndex = state.items.items.findIndex(
        (item) =>
          item.id === newItem.id &&
          JSON.stringify(item.variation) === JSON.stringify(newItem.variation)
      );
      if (existingItemIndex >= 0) {
        state.items.items[existingItemIndex].quantity = String(
          parseInt(state.items.items[existingItemIndex].quantity) +
            parseInt(newItem.quantity)
        );
      } else {
        state.items.items.push(newItem);
      }
      state.items.totals.total_items = state.items.items.reduce(
        (sum, item) => sum + parseInt(item.quantity),
        0
      );
      state.items.totals.total_price = state.items.items.reduce(
        (sum, item) => sum + parseInt(item.prices.price) * parseInt(item.quantity),
        0
      );
    },
    clearCart: (state) => {
      state.items = { ...initialCartData };
    },
    setLoginStatus: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
    },
    mergeCart: (state, action: PayloadAction<CartItem[]>) => {
      const apiCart = action.payload;
      state.items.items = [...apiCart];
      const localItems = state.items.items.filter(
        (item) =>
          !apiCart.some(
            (apiItem) =>
              apiItem.id === item.id &&
              JSON.stringify(apiItem.variation) ===
                JSON.stringify(item.variation)
          )
      );
      state.items.items = [...apiCart, ...localItems];
      state.items.totals.total_items = state.items.items.reduce(
        (sum, item) => sum + parseInt(item.quantity),
        0
      );
      state.items.totals.total_price = state.items.items.reduce(
        (sum, item) => sum + parseInt(item.prices.price) * parseInt(item.quantity),
        0
      );
    },
    removeItem: (state, action: PayloadAction<{ id: number }>) => {
      state.items.items = state.items.items.filter(
        item => item.id !== action.payload.id
      );
      state.items.totals.total_items = state.items.items.reduce(
        (sum, item) => sum + parseInt(item.quantity),
        0
      );
      state.items.totals.total_price = state.items.items.reduce(
        (sum, item) => sum + parseInt(item.prices.price) * parseInt(item.quantity),
        0
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        addToCartAsync.fulfilled,
        (state, action: PayloadAction<CartData>) => {
          state.status = "succeeded";
          state.items = action.payload;
          state.error = null;
        }
      )
      .addCase(addToCartAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ?? "Unknown error";
      })
      .addCase(removeFromCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        removeFromCartAsync.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.status = "succeeded";
          // Assuming cart_id corresponds to item.key
          state.items.items = state.items.items.filter(
            item => item.key !== action.payload
          );
          state.items.totals.total_items = state.items.items.reduce(
            (sum, item) => sum + parseInt(item.quantity),
            0
          );
          state.items.totals.total_price = state.items.items.reduce(
            (sum, item) => sum + parseInt(item.prices.price) * parseInt(item.quantity),
            0
          );
          state.error = null;
        }
      )
      .addCase(removeFromCartAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ?? "Unknown error";
      });
  },
});

export const { addToLocalCart, clearCart, setLoginStatus, mergeCart, removeItem } =
  cartASlice.actions;
export default cartASlice.reducer;

export const selectCartItems = (state: RootState): CartData =>
  state.cartA.items;