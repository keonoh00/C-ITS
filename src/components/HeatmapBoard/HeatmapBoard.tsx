"use client";

import React, { useMemo } from "react";
import { HeatmapEvaluationFramework, Tactic } from "./tacticsData";
import HeatmapCard from "./HeatmapCard";
import Legend from "./Legend";
import { tacticsDataEnterprise } from "./enterprise/enterpriseData";
import { tacticsDataMobile } from "./mobile/mobileData";
import { tacticsDataICS } from "./ics/icsData";

interface HeatmapBoardProps {
  selectedTactic: string;
  framework: HeatmapEvaluationFramework;
}

const frameworkMap: Record<HeatmapEvaluationFramework, Tactic[]> = {
  [HeatmapEvaluationFramework.ENTERPRISE]: tacticsDataEnterprise,
  [HeatmapEvaluationFramework.MOBILE]: tacticsDataMobile,
  [HeatmapEvaluationFramework.ICS]: tacticsDataICS,
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
    if (selectedTactic.startsWith("All Selected")) return tacticsData;
    return tacticsData.filter((t) => t.name === selectedTactic);
  }, [selectedTactic, tacticsData]);

  return (
    <div className="w-full">
      <Legend />

      <div
        className="grid mt-6 justify-around"
        style={{
          gridTemplateColumns: "repeat(auto-fit, minmax(80px, 1fr))",
        }}
      >
        {filteredTactics.map((tactic, idx) => (
          <div
            key={idx}
            className="flex flex-col justify-start rounded-lg p-2 min-w-0 max-w-[140px]"
          >
            {/* Title */}
            <div className="text-xs font-bold text-neutral-300 text-center mb-2 h-[40px] flex items-center justify-center flex-col space-y-1 min-w-0">
              <p className="max-w-full">{tactic.name}</p>
              <p className="font-medium text-gray-50 text-xs">
                {tactic.techniques.length} Techniques
              </p>
            </div>

            {/* Techniques */}
            <div className="flex flex-col w-full gap-2 min-w-0">
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
