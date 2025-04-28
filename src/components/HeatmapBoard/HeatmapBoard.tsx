"use client";

import React, { useMemo } from "react";
import {
  tacticsDataMobile,
  tacticsDataEnterprise,
  tacticsDataICS,
  Tactic,
} from "./tacticsData";
import HeatmapCard from "./HeatmapCard";
import Legend from "./Legend";

interface HeatmapBoardProps {
  selectedTactic: string;
  framework: string;
}

const frameworkMap: Record<string, Tactic[]> = {
  Mobile: tacticsDataMobile,
  Enterprise: tacticsDataEnterprise,
  ICS: tacticsDataICS,
};

export default function HeatmapBoard({
  selectedTactic,
  framework,
}: HeatmapBoardProps) {
  const tacticsData: Tactic[] = useMemo(
    () => frameworkMap[framework] ?? [],
    [framework]
  );

  const filteredTactics: Tactic[] = useMemo(() => {
    if (selectedTactic === "All Selected (4)") return tacticsData;
    return tacticsData.filter((t) => t.name === selectedTactic);
  }, [selectedTactic, tacticsData]);

  return (
    <div className="w-full">
      <Legend />

      <div
        className="grid w-full gap-4 mt-6"
        style={{
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", // slightly bigger min width
        }}
      >
        {filteredTactics.map((tactic, idx) => (
          <div key={idx} className="flex flex-col justify-start rounded-lg p-2">
            {/* Title */}
            <div className="text-xs font-bold text-neutral-300 text-center mb-2 h-[40px] flex items-center justify-center">
              {tactic.name}
            </div>

            {/* Techniques */}
            <div className="flex flex-col w-full gap-2">
              {tactic.techniques.map((technique, tIdx) => (
                <HeatmapCard key={tIdx} technique={technique} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
