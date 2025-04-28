"use client";

import React, { useState } from "react";
import { X } from "lucide-react";
import SearchInput from "../SearchInput/SearchInput";

interface SelectedFilter {
  label: string;
  value: string;
}

interface FilterSideBarProps {
  onChange: () => void;
}

export default function FilterSidebar({ onChange }: FilterSideBarProps) {
  const [selectedFilters, setSelectedFilters] = useState<SelectedFilter[]>([
    { label: "Assessment", value: "Carbanak APT" },
    { label: "Last Activity", value: "07-05 ~ 07-13" },
  ]);
  const [startDate, setStartDate] = useState("2025-04-27");
  const [endDate, setEndDate] = useState("2025-04-27");
  const [assessment, setAssessment] = useState("");

  const handleRemoveFilter = (filterLabel: string) => {
    setSelectedFilters((prev) => prev.filter((f) => f.label !== filterLabel));
  };

  return (
    <>
      <SearchInput onSearch={onChange} />

      <div className="flex flex-col bg-base-900 p-4 text-white rounded-md w-full">
        {selectedFilters && selectedFilters.length > 0 ? (
          <div className="flex flex-col gap-2 rounded mb-4">
            {selectedFilters.map((filter, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between bg-base-700 p-2 rounded"
              >
                <span className="text-sm text-neutral-300">
                  {filter.label} : {filter.value}
                </span>
                <button onClick={() => handleRemoveFilter(filter.label)}>
                  <X size={14} className="text-neutral-400" />
                </button>
              </div>
            ))}
          </div>
        ) : null}

        <div className="flex flex-col gap-2 mb-4">
          <span className="text-neutral-400">Last Activity</span>
          <input
            type="date"
            className="p-2 bg-base-800 border border-neutral-600 rounded text-neutral-200"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <input
            type="date"
            className="p-2 bg-base-800 border border-neutral-600 rounded text-neutral-200"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-neutral-400">Assessment</span>
          <select
            className="p-2 bg-base-800 border border-neutral-600 rounded text-neutral-200"
            value={assessment}
            onChange={(e) => setAssessment(e.target.value)}
          >
            <option value="">Select</option>
            <option value="Carbanak APT">Carbanak APT</option>
            <option value="APT28">APT28</option>
            <option value="Lazarus Group">Lazarus Group</option>
          </select>
        </div>
      </div>
    </>
  );
}
