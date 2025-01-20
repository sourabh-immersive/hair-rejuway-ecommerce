"use client";

import { useEffect } from "react";
import { getSessionData } from "./server-actions/actions";
import { initializeSession } from "@/lib/features/authSlice/authSlice";
import { useAppDispatch } from "@/lib/hooks";

interface Props {
  readonly children: React.ReactNode;
}

export const RefreshSession = ({ children }: Props) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    async function getSessionRefresh() {
      const sessionData = await getSessionData();
      if (sessionData?.user) {
        const userExist = {
          id: sessionData.user.id || "",
          name: sessionData.user.name || "",
          email: sessionData.user.email || "",
          token: sessionData.user.apiToken || "",
        };

        // Dispatch the user data to Redux store
        dispatch(initializeSession(userExist));
      } else {
        dispatch(initializeSession(null));
      }
    }
    getSessionRefresh();
  }, [dispatch]);

  return <>{children}</>;
};
