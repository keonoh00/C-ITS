import { persist } from "zustand/middleware";
import { createStore } from "zustand/vanilla";

export type PersistState = {
  persistBoolean: boolean;
};

export type PersistActions = {
  togglePersistBoolean: () => void;
};

export type PersistStore = PersistState & PersistActions;

export const defaultInitState: PersistState = {
  persistBoolean: false,
};

const persistOptions = {
  name: "persist-storage",
};

export const createPersistStore = (
  initState: PersistState = defaultInitState
) => {
  return createStore<PersistStore>()(
    persist(
      (set) => ({
        ...initState,
        togglePersistBoolean: () => {
          set((prevState) => ({ persistBoolean: !prevState.persistBoolean }));
        },
      }),
      persistOptions
    )
  );
};

export const store = createPersistStore();
