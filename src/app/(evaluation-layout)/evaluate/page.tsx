"use client";

import FilterBar from "@/components/FilterBar/FilterBar";
import HeatmapBoard from "@/components/HeatmapBoard/HeatmapBoard";
import ResilienceChart from "@/components/ResilienceChart/ResilienceChart";
import MetricsBoard from "@/components/MetricsBoard/MetricsBoard"; // 🔥 New one
import React, { useState } from "react";
import DrillDownTable from "@/components/DrilldownReportTable/DrilldownReportTable";
import {
  EvaluationReportTypes,
  HeatmapEvaluationFramework,
  TacticOptions,
} from "@/components/HeatmapBoard/tacticsData";

export default function Evaluate() {
  const [reportType, setReportType] = useState<EvaluationReportTypes>(
    EvaluationReportTypes.HEATMAP
  );
  const [round, setRound] = useState("All Selected (4)");
  const [selectedTactic, setSelectedTactic] = useState(
    TacticOptions.filter((item) => item.startsWith("All Selected"))[0]
  );
  const [framework, setFramework] = useState<HeatmapEvaluationFramework>(
    HeatmapEvaluationFramework.MOBILE
  );

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-row items-center justify-between">
        <h1 className="text-xl">Penetration to C-ITS Center</h1>
        <div className="flex flex-row gap-3">
          <span className="text-gray-400 text-sm">{"Evaluate"}</span>
        </div>
      </div>
      {/* FilterBar */}
      <FilterBar
        reportOptions={Object.values(EvaluationReportTypes)}
        reportType={reportType}
        setReportType={setReportType}
        roundOptions={[
          "All (4)",
          "Penetration to C-ITS Center (Q1)",
          "Penetration to C-ITS Center (Q2)",
          "Penetration to C-ITS Center (Q3)",
          "Penetration to C-ITS Center (Q4)",
        ]}
        round={round}
        setRound={setRound}
        tactics={selectedTactic}
        setTactics={setSelectedTactic}
        framework={framework}
        setFramework={setFramework}
      />
      <div className="flex flex-col gap-4 p-6 bg-base-900">
        {/* Main Content */}
        {reportType === "Heat Map" && (
          <HeatmapBoard selectedTactic={selectedTactic} framework={framework} />
        )}

        {reportType === "Resilience Trending" && <ResilienceChart />}

        {reportType === "Metrics" && <MetricsBoard />}

        {reportType === "Drilldown Report" && <DrillDownTable />}
      </div>
    </div>
  );
}
