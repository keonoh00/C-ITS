"use client";

import RoundTable from "@/components/RoundTable/RoundTable";
import FilterSidebar from "@/components/FilterSidebar/FilterSidebar";
import { PlusIcon } from "lucide-react";

export default function Round() {
  const onSearchClick = () => {
    console.log("Search clicked");
  };

  return (
    <div>
      <div className="flex flex-row items-center justify-between mb-6">
        <h1 className="text-xl">Penetration to C-ITS Center</h1>
        <div className="flex flex-row gap-3">
          <span className="text-gray-300 text-sm">{"Assessment "}</span>
          <span className="text-gray-300 text-sm">{">"}</span>
          <span className="text-gray-400 text-sm">{"Round"}</span>
        </div>
      </div>

      <div className="flex flex-5 space-x-4 flex-row mt-4 w-full">
        <div className="flex flex-1 flex-col space-y-5">
          <FilterSidebar onChange={onSearchClick} />
        </div>
        <div className="flex flex-4 flex-col space-y-5">
          <div className="flex flex-row items-center justify-end">
            <button className="px-4 py-2 bg-purple-300 hover:bg-purple-400 flex flex-row rounded-4xl items-center">
              <PlusIcon size={20} color="white" />
              <p className="ml-1 font-bold">Create Scenario</p>
            </button>
          </div>
          <RoundTable />
        </div>
      </div>
    </div>
  );
}
