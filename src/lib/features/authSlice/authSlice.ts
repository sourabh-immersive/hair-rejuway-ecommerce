import { createAppSlice } from "@/lib/createAppSlice";
import type { AppThunk } from "@/lib/store";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface AuthUser {
  id: string | number;
  name: string;
  email: string;
  token: string;
}

export interface AuthSliceState {
  user: AuthUser | null;
  status: "idle" | "loading" | "authenticated" | "failed";
  error: string | null;
}

const initialState: AuthSliceState = {
  user: null,
  status: "idle",
  error: null,
};

const authSlice = createAppSlice({
  name: "auth",
  initialState,
  reducers: (create) => ({

    initializeSession: create.reducer(
      (state, action: PayloadAction<AuthUser | null>) => {
        if (action.payload) {
          state.user = action.payload;
          state.status = "authenticated";
        } else {
          state.user = null;
          state.status = "idle";
        }
      }
    ),


    loginRequest: create.reducer((state) => {
      state.status = "loading";
      state.error = null;
    }),



    loginSuccess: create.reducer((state, action: PayloadAction<AuthUser>) => {
      state.user = action.payload;
      state.status = "authenticated";
      state.error = null;
    }),

    loginFailure: create.reducer((state, action: PayloadAction<string>) => {
      state.status = "failed";
      state.error = action.payload;
    }),

    logout: create.reducer((state) => {
      state.user = null;
      state.status = "idle";
      state.error = null;
    }),
  }),
  selectors: {
    getAuthUser: (auth) => auth.user,
    getAuthStatus: (auth) => auth.status,
    getAuthError: (auth) => auth.error,
  },
});

export default authSlice;

export const { initializeSession, loginRequest, loginSuccess, loginFailure, logout } =
  authSlice.actions;

// Selectors
export const { getAuthUser, getAuthStatus, getAuthError } = authSlice.selectors;
