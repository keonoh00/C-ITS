"use client";

import {
  fetchAttackGraphConfiguration,
  GraphFlattenBlock,
} from "@/api/defend/graph";
import { Dropdown } from "@/components/common/Dropdown/Dropdown";
import Loading from "@/components/common/Loading/Loading";
import PropertiesTechniqueTable from "@/components/PropertiesTable/PropertiesTable";
import { useEffect, useState } from "react";

const OPTIONS = [
  "465e4284-92e8-40a1-b764-2a70866ef1de",
  "876def0d-dc63-48c9-9ba9-3d83ef31bfed",
  "5867a04f-a6dc-493b-afe0-dd0c273ace9a",
  "f0277a5c-2304-4af5-b4e7-b950d3e41807",
];

export default function Properties() {
  const [selectedOption, setSelectedOption] = useState<string>(OPTIONS[0]);
  const [graphData, setGraphData] = useState<GraphFlattenBlock[]>([]);

  useEffect(() => {
    const fetch = async () => {
      const _data = await fetchAttackGraphConfiguration(OPTIONS[0], true);
      setGraphData(_data);
    };
    fetch();
  }, []);

  return (
    <div>
      <div className="flex flex-row items-center justify-between mb-6">
        <div className="flex flex-row items-center gap-4 w-full">
          <h1 className="text-xl">Penetration to C-ITS Center (Q1)</h1>
          <div className="w-[15%] text-xs">
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
          src={`http://192.168.5.111:1111/graph?id=${selectedOption}&type=result`}
          width={960}
          height={540}
        />
      </div>

      <div className="space-y-10 mt-4 w-full">
        {graphData ? (
          <PropertiesTechniqueTable graphData={graphData} />
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
}
