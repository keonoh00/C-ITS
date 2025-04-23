import { createStore } from "zustand/vanilla";

export type SampleStoreApi = ReturnType<typeof createSampleStore>;

export enum SampleEnum {
  One = "Display 1",
  Two = "Display 2",
}

export type SampleState = {
  sample: SampleEnum;
};

export type SampleActions = {
  updateSample: (sample: SampleEnum) => void;
  updateSampleWithFilter: (sample: SampleEnum) => void;
};

export type SampleStore = SampleState & SampleActions;

export const defaultInitState: SampleState = {
  sample: SampleEnum.One,
};

export const initSampleStore = (): SampleState => {
  return defaultInitState;
};

export const createSampleStore = (
  initState: SampleState = defaultInitState
) => {
  return createStore<SampleStore>()((set) => ({
    ...initState,
    updateSample: (sample) => set(() => ({ sample })),
    updateSampleWithFilter: () =>
      set((state) => {
        const sampleParam = state.sample;
        // Filters here
        if (!sampleParam) {
          return {};
        }

        return { sample: sampleParam };
      }),
  }));
};
