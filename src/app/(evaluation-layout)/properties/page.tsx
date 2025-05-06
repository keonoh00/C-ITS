"use client";

import { Dropdown } from "@/components/Dropdown/Dropdown";
import PropertiesTechniqueTable from "@/components/PropertiesTable/PropertiesTable";
import { useState } from "react";

const OPTIONS = [
  "Option1",
  "Option2",
  "Option3",
  "Option4",
  "Option5",
  "Option6",
  "Option7",
];

export default function Properties() {
  const [selectedOption, setSelectedOption] = useState<string>(OPTIONS[0]);
  return (
    <div>
      <div className="flex flex-row items-center justify-between mb-6">
        <div className="flex flex-row items-center gap-4 w-full">
          <h1 className="text-xl">Penetration to C-ITS Center (Q1)</h1>
          <div className="w-40 text-xs">
            <Dropdown
              selected={selectedOption}
              options={OPTIONS}
              onChange={(value) => setSelectedOption(value)}
            />
          </div>
        </div>

        <div className="flex flex-row gap-3">
          <span className="text-gray-300 text-sm">Assessment</span>
          <span className="text-gray-300 text-sm">{">"}</span>
          <span className="text-gray-300 text-sm">Round</span>
          <span className="text-gray-300 text-sm">{">"}</span>
          <span className="text-gray-400 text-sm">Properties</span>
        </div>
      </div>

      <div className="flex bg-base-800 p-12 justify-center">
        <embed
          type="text/html"
          src="http://192.168.5.111:1111/graph?id=f0277a5c-2304-4af5-b4e7-b950d3e41807&type=result"
          width={960}
          height={540}
        />
      </div>

      <div className="space-y-10 mt-4 w-full">
        <PropertiesTechniqueTable />
      </div>
    </div>
  );
}
