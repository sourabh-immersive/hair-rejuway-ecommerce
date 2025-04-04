import type { Action, ThunkAction } from "@reduxjs/toolkit";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { cartSlice } from "./features/cart/cartSlice";
import cartAReducer from "./features/cart/cartASlice";
import { persistReducer, persistStore } from "redux-persist";
import createWebStorage from "redux-persist/es/storage/createWebStorage";
import { wishlistSlice } from "./features/wishlist/wishlistSlice";
import authSlice from "./features/authSlice/authSlice";
import cartBSlice from "./features/cart/cartBSlice";

// Fallback to noop storage for server
const createNoopStorage = () => {
  return {
    getItem() {
      return Promise.resolve(null);
    },
    setItem(_key: string, value: any) {
      return Promise.resolve(value);
    },
    removeItem() {
      return Promise.resolve();
    },
  };
};

// Conditional storage based on environment
const storage = typeof window !== "undefined" ? createWebStorage("local") : createNoopStorage();

// Redux-persist configuration
const persistConfig = {
  key: "root",
  storage,
};

// Root reducer
const rootReducer = combineReducers({
  wishlist: wishlistSlice.reducer,
  cart: cartSlice.reducer,
  auth: authSlice.reducer,
  cartA: cartAReducer,
  cartB: cartBSlice,
});

// Persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Store factory function
export const makeStore = () =>
  configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
        },
      }),
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = AppStore["dispatch"];
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>;