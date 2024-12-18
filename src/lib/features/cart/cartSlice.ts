import { createAppSlice } from "@/lib/createAppSlice";
import type { AppThunk } from "@/lib/store";
import type { PayloadAction } from "@reduxjs/toolkit";
import { StaticImageData } from "next/image";

interface AttributeOptions {
  name: string;
  options: string[];
}

export interface CartItem {
  id: string;
  name: string;
  thumbnail: string | StaticImageData | null,
  price: number;
  salePrice: number;
  attributesData?: any;
  quantity: number;
  productType?: string;
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
    // addItemToCart: create.reducer(
    //   (state, action: PayloadAction<CartItem>) => {
    //     const itemIndex = state.items.findIndex(item => item.id === action.payload.id);
    //     (action.payload.productType === 'simple') ? (
    //        (itemIndex >= 0) ?
    //         state.items[itemIndex].quantity += action.payload.quantity
    //        :
    //         state.items.push({ ...action.payload })
    //     ) : (
    //       ''
    //     )
        

    //     state.totalItems += action.payload.quantity;
    //     state.totalAmount += action.payload.price * action.payload.quantity;
    //   }
    // ),

    addItemToCart: create.reducer(
      (state, action: PayloadAction<CartItem>) => {
        const { id, productType, attributesData, quantity, price, salePrice } = action.payload;
        if (productType === 'simple') {
          const itemIndex = state.items.findIndex(item => item.id === id);
          if (itemIndex >= 0) {
            state.items[itemIndex].quantity += quantity;
          } else {
            state.items.push({ ...action.payload });
            console.log('new prod to cart', {...action.payload})
          }
        } else if (productType === 'variable') {
          const existingItemIndex = state.items.findIndex(item => {
            return (
              item.id === id &&
              item.attributesData?.length === attributesData?.length &&
              item.attributesData.every((attr: any, index: any) => 
                attr.name === attributesData[index]?.name &&
                attr.value === attributesData[index]?.value
              )
            );
          });
    
          if (existingItemIndex >= 0) {
            state.items[existingItemIndex].quantity += quantity;
          } else {
            state.items.push({ ...action.payload });
          }
        }
    
        state.totalItems += quantity;
        state.totalAmount += salePrice * quantity;
      }
    ),

    removeItemFromCart: create.reducer(
      (
        state,
        action: PayloadAction<{ id: string; attributesData?: { name: string; value: string }[] }>
      ) => {
        const { id, attributesData } = action.payload;
    
        // Find the index of the item
        const itemIndex = state.items.findIndex((item) => {
          if (item.id !== id) return false;
    
          if (attributesData) {
            // Check if the attributes match
            return (
              item.attributesData &&
              item.attributesData.length === attributesData.length &&
              item.attributesData.every((attr: any, index:any) => {
                return (
                  attr.name === attributesData[index].name &&
                  attr.value === attributesData[index].value
                );
              })
            );
          }
    
          return true; // If no attributes provided, match by id only
        });
    
        // If an item is found, remove it
        if (itemIndex >= 0) {
          const item = state.items[itemIndex];
          state.totalItems -= item.quantity;
          state.totalAmount -= (item.salePrice) * item.quantity;
    
          state.items.splice(itemIndex, 1); // Remove the item
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