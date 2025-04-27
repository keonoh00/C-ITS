"use client";

import EvaluationuationAssessmentTable from "@/components/RoundTable/RoundTable";
import FilterSidebar from "@/components/FilterSidebar/FilterSidebar";
import { PlusIcon, Search } from "lucide-react";

export default function Round() {
  const onSearchClick = () => {
    console.log("Search clicked");
  };

  return (
    <div>
      <div className="flex flex-row items-center justify-between mb-6">
        <h1 className="text-xl">감내 수준 평가 시스템</h1>
        <span className="text-gray-400 text-sm">Assessment</span>
      </div>

      <div className="flex flex-row items-center justify-between">
        <div className="flex items-center">
          <input
            placeholder="Search..."
            className="p-2 bg-base-800 border border-neutral-500 text-neutral-300 rounded-sm text-sm w-[300px]"
          />
          <button className="ml-2 p-2" onClick={onSearchClick}>
            <Search size={18} className="text-neutral-400" />
          </button>
        </div>

        <button className="px-4 py-2 bg-purple-300 hover:bg-purple-400 flex flex-row rounded-4xl items-center">
          <PlusIcon size={20} color="white" />
          <p className="ml-1 font-bold">Create Scenario</p>
        </button>
      </div>
      <div className="flex flex-4 space-x-10 flex-row mt-4 w-full">
        <FilterSidebar />
        <EvaluationuationAssessmentTable />
      </div>
    </div>
  );
}
