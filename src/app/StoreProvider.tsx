"use client";

import type { AppStore } from "@/lib/store";
import { makeStore } from "@/lib/store";
import { setupListeners } from "@reduxjs/toolkit/query";
import { useEffect, useRef } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

interface Props {
  readonly children: React.ReactNode;
}

export const StoreProvider = ({ children }: Props) => {
  const storeRef = useRef<{ store: AppStore; persistor: ReturnType<typeof persistStore> } | null>(null);

  if (!storeRef.current) {
    const store = makeStore();
    const persistor = persistStore(store);
    storeRef.current = { store, persistor };
  }

  useEffect(() => {
    if (storeRef.current) {
      // Configure listeners for `refetchOnFocus`/`refetchOnReconnect` behaviors
      const unsubscribe = setupListeners(storeRef.current.store.dispatch);
      return unsubscribe;
    }
  }, []);

  return (
    <Provider store={storeRef.current.store}>
      <PersistGate loading={null} persistor={storeRef.current.persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
};