"use client";

import { useHydration } from "@/hook/useHydration";
import { usePersistStore } from "@/store/persistStore";
import { SampleEnum, useSampleStore } from "@/store/sampleStore";

export default function Home() {
  const hydrated = useHydration(usePersistStore);
  const persistStore = usePersistStore((state) => state);
  const sampleStore = useSampleStore((state) => state);

  return (
    <div>
      <p>Zustand State Management Demo</p>
      <div className="items-center bg-gray-300 ">
        <div className="flex justify-around flex-row">
          <p>persistBoolean: {String(persistStore.persistBoolean)}</p>
          <button
            className="bg-white border rounded-md"
            onClick={persistStore.toggle}
          >
            Toggle persistBoolean
          </button>
        </div>

        <div className="flex justify-around flex-row">
          <p>sampleOption: {hydrated && sampleStore.sample}</p>
          <select
            onChange={(e) => {
              e.preventDefault();
              console.log(e);
              sampleStore.updateSample(e.target.value as SampleEnum);
            }}
            name="sampleOption"
          >
            {Object.keys(SampleEnum).map((key) => {
              const value = SampleEnum[key as keyof typeof SampleEnum];
              return (
                <option key={key} value={value}>
                  {value}
                </option>
              );
            })}
          </select>
        </div>
      </div>
    </div>
  );
}
