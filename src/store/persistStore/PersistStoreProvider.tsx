"use client";

import {
  type ReactNode,
  createContext,
  useRef,
  useContext,
  useState,
  useEffect,
} from "react";
import { useStore } from "zustand";
import { store, PersistStore, createPersistStore } from "./persistStore";

export type PersistStoreApi = ReturnType<typeof createPersistStore>;

export const PersistStoreContext = createContext<PersistStoreApi | undefined>(
  undefined
);

export interface HydrationWrapperProps {
  children: ReactNode;
}

const HydrationWrapper = ({ children }: HydrationWrapperProps) => {
  const hydrated = useHydration();

  if (!hydrated) {
    return null; // or a loading indicator
  }

  return children;
};

export interface PersistStoreProviderProps {
  children: ReactNode;
}

export const PersistStoreProvider = ({
  children,
}: PersistStoreProviderProps) => {
  const storeRef = useRef<PersistStoreApi>(undefined);
  if (!storeRef.current) {
    storeRef.current = createPersistStore();
  }

  return (
    <PersistStoreContext.Provider value={storeRef.current}>
      <HydrationWrapper>{children}</HydrationWrapper>
    </PersistStoreContext.Provider>
  );
};

export const usePersistStore = <T,>(
  selector: (store: PersistStore) => T
): T => {
  const persistStoreContext = useContext(PersistStoreContext);

  if (!persistStoreContext) {
    throw new Error(`usePersistStore must be used within PersistStoreProvider`);
  }

  return useStore(persistStoreContext, selector);
};

export const useHydration = () => {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const unsubFinishHydration = store.persist.onFinishHydration(() =>
      setHydrated(true)
    );

    setHydrated(store.persist.hasHydrated());

    return () => {
      unsubFinishHydration();
    };
  }, []);

  return hydrated;
};
