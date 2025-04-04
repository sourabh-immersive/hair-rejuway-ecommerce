"use client";

import { useEffect } from "react";
import { getSessionData } from "./server-actions/actions";
import { initializeSession } from "@/lib/features/authSlice/authSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { syncCartWithServer } from "@/lib/features/cart/cartBSlice";

interface Props {
  readonly children: React.ReactNode;
}

export const RefreshSession = ({ children }: Props) => {
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (auth.status === "authenticated") {
      dispatch(syncCartWithServer());
    }
  }, [auth, dispatch]);

  useEffect(() => {
    async function getSessionRefresh() {
      const sessionData = await getSessionData();
      console.log('data after logout in refresh', sessionData)
      if (sessionData?.user) {
        const userExist = {
          id: sessionData.user.id || "",
          name: sessionData.user.name || "",
          email: sessionData.user.email || "",
          token: sessionData.user.apiToken || "",
        };

        // Dispatch the user data to Redux store
        dispatch(initializeSession(userExist));
        // dispatch(syncCartWithServer());
      } else {
        dispatch(initializeSession(null));
      }
    }
    getSessionRefresh();
  }, [dispatch]);

  return <>{children}</>;
};
