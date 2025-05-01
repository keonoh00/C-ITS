"use client";

import MoviePlayer from "@/components/MoviePlayer/MovieComponent";
import PropertiesTechniqueTable from "@/components/PropertiesTable/PropertiesTable";

export default function Properties() {
  return (
    <div>
      <div className="flex flex-row items-center justify-between mb-6">
        <h1 className="text-xl">Penetration to C-ITS Center (Q1)</h1>
        <div className="flex flex-row gap-3">
          <span className="text-gray-300 text-sm">{"Assessment "}</span>
          <span className="text-gray-300 text-sm">{">"}</span>
          <span className="text-gray-300 text-sm">{"Round "}</span>
          <span className="text-gray-300 text-sm">{">"}</span>
          <span className="text-gray-400 text-sm">{"Properties"}</span>
        </div>
      </div>

      <div className="space-y-10  mt-4 w-full">
        <MoviePlayer />
        <PropertiesTechniqueTable />
      </div>
    </div>
  );
}
