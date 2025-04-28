"use client";

import EvaluationuationAssessmentTable from "@/components/RoundTable/RoundTable";
import FilterSidebar from "@/components/FilterSidebar/FilterSidebar";
import { PlusIcon } from "lucide-react";
import SearchInput from "@/components/SearchInput/SearchInput";

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
        <SearchInput onSearch={onSearchClick} />

        <button className="px-4 py-2 bg-purple-300 hover:bg-purple-400 flex flex-row rounded-4xl items-center">
          <PlusIcon size={20} color="white" />
          <p className="ml-1 font-bold">Create Scenario</p>
        </button>
      </div>
      <div className="flex flex-4 space-x-10 flex-row mt-4 w-full">
        <FilterSidebar onChange={onSearchClick} />
        <EvaluationuationAssessmentTable />
      </div>
    </div>
  );
}
