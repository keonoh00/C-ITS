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
    <div className="flex flex-col gap-4 p-6 bg-base-900">
      {/* FilterBar */}
      <FilterBar
        reportOptions={Object.values(EvaluationReportTypes)}
        reportType={reportType}
        setReportType={setReportType}
        roundOptions={["-----------------"]}
        round={round}
        setRound={setRound}
        tactics={selectedTactic}
        setTactics={setSelectedTactic}
        framework={framework}
        setFramework={setFramework}
      />

      {/* Main Content */}
      {reportType === "Heat Map" && (
        <HeatmapBoard selectedTactic={selectedTactic} framework={framework} />
      )}

      {reportType === "Resilience Trending" && <ResilienceChart />}

      {reportType === "Metrics" && <MetricsBoard />}

      {reportType === "Drilldown Report" && <DrillDownTable />}
    </div>
  );
}
