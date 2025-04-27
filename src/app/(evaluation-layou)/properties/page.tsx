"use client";

import MoviePlayer from "@/components/MoviePlayer/MovieComponent";
import PropertiesTechniqueTable from "@/components/PropertiesTable/PropertiesTable";

export default function Properties() {
  return (
    <div>
      <div className="flex flex-row items-center justify-between mb-6">
        <h1 className="text-xl">감내 수준 평가 시스템</h1>
        <span className="text-gray-400 text-sm">Assessment</span>
      </div>

      <div className="space-y-10  mt-4 w-full">
        <MoviePlayer />
        <PropertiesTechniqueTable />
      </div>
    </div>
  );
}
