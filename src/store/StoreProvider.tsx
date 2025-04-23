import { ReactNode } from "react";
import { PersistStoreProvider } from "./persistStore/PersistStoreProvider";
import { SampleStoreProvider } from "./sampleStore/SampleStoreProvider";

interface StoreProviderProps {
  children: ReactNode;
}

export default function StoreProvider({ children }: StoreProviderProps) {
  return (
    <PersistStoreProvider>
      <SampleStoreProvider>{children}</SampleStoreProvider>
    </PersistStoreProvider>
  );
}
