"use client";

import { type ReactNode, createContext, useRef, useContext } from "react";
import { useStore } from "zustand";
import {
  createSampleStore,
  initSampleStore,
  SampleStore,
  SampleStoreApi,
} from "./sampleStore";

export const sampleStoreCreated = createSampleStore(initSampleStore());

export const SampleStoreContext = createContext<SampleStoreApi | undefined>(
  undefined
);

export interface SampleStoreProviderProps {
  children: ReactNode;
}

export const SampleStoreProvider = ({ children }: SampleStoreProviderProps) => {
  const storeRef = useRef<SampleStoreApi>(undefined);
  if (!storeRef.current) {
    storeRef.current = sampleStoreCreated;
  }

  return (
    <SampleStoreContext.Provider value={storeRef.current}>
      {children}
    </SampleStoreContext.Provider>
  );
};

export const useSampleStore = <T,>(selector: (store: SampleStore) => T): T => {
  const sampleStoreContext = useContext(SampleStoreContext);

  if (!sampleStoreContext) {
    throw new Error(`useSampleStore must be used within SampleStoreProvider`);
  }

  return useStore(sampleStoreContext, selector);
};
