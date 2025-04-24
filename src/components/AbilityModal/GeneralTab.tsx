import { useState } from "react";

export const GeneralTab = () => {
  const [state, setState] = useState("Enterprise");

  return (
    <div className="space-y-6">
      {/* Grid Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="flex flex-col col-span-1">
          <label className="text-sm font-bold mb-2">Ability ID</label>
          <input
            className="bg-base-800 p-2 rounded border border-base-850"
            placeholder="ID"
          />
        </div>
        <div className="flex flex-col md:col-span-2">
          <label className="text-sm font-bold mb-2">Ability UID</label>
          <input
            className="bg-base-800 p-2 rounded border border-base-850"
            placeholder="UID"
          />
        </div>
        <div className="flex flex-col col-span-1">
          <label className="text-sm font-bold mb-2">Name</label>
          <input
            className="bg-base-800 p-2 rounded border border-base-850"
            placeholder="Name"
          />
        </div>
      </div>

      {/* Description */}
      <div>
        <label className="text-sm font-bold mb-2 block">Description</label>
        <textarea
          className="bg-base-800 p-2 rounded w-full border border-base-850"
          placeholder="내용..."
          rows={3}
        />
      </div>

      {/* State Radio Buttons */}
      <div>
        <label className="text-sm font-bold mb-2 block">State</label>
        <div className="flex gap-6">
          {["Enterprise", "Mobile", "ICS"].map((val) => (
            <label key={val} className="inline-flex items-center space-x-2">
              <input
                type="radio"
                name="state"
                value={val}
                checked={state === val}
                onChange={() => setState(val)}
                className="accent-blue-500"
              />
              <span>{val}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Zip Inputs */}
      <div className="space-y-2">
        <input
          className="bg-base-800 p-2 rounded w-full border border-base-850"
          placeholder="Please provide a valid zip."
        />
        <input
          className="bg-base-800 p-2 rounded w-full border border-base-850"
          placeholder="Please provide a valid zip."
        />
      </div>

      {/* Related Threat Group */}
      <div>
        <label className="text-sm font-bold mb-2 block">
          Related Threat Group
        </label>
        <input
          type="file"
          className="bg-base-800 w-full text-sm text-gray-400 file:py-2 file:px-4 file:border-0 file:bg-neutral-500 file:hover:bg-neutral-600 file:text-white mb-2 file:rounded-l"
        />
        <textarea
          className="bg-base-800 p-2 rounded w-full border border-base-850"
          rows={3}
        ></textarea>
      </div>

      {/* Related CVE */}
      <div>
        <label className="text-sm font-bold mb-2 block">Related CVE</label>
        <input
          type="file"
          className="bg-base-800 w-full text-sm text-gray-400 file:py-2 file:px-4 file:border-0 file:bg-neutral-500 file:hover:bg-neutral-600 file:text-white mb-2 file:rounded-l"
        />
        <textarea
          className="bg-base-800 p-2 rounded w-full border border-base-850"
          rows={3}
        ></textarea>
      </div>
    </div>
  );
};
