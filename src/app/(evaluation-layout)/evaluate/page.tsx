"use client";

import FilterBar from "@/components/FilterBar/FilterBar";
import HeatmapBoard, {
  frameworkMap,
} from "@/components/HeatmapBoard/HeatmapBoard";
import ResilienceChart, {
  resilienceData,
} from "@/components/ResilienceChart/ResilienceChart";
import MetricsBoard from "@/components/MetricsBoard/MetricsBoard"; // 🔥 New one
import React, { useState } from "react";
import DrillDownTable from "@/components/DrilldownReportTable/DrilldownReportTable";
import {
  EvaluationReportTypes,
  HeatmapEvaluationFramework,
} from "@/components/HeatmapBoard/tacticsData";

export enum DUMMY_ROUND_OPTIONS {
  ALL = "All Selected (4)",
  Q1 = "Penetration to C-ITS Center (Q1)",
  Q2 = "Penetration to C-ITS Center (Q2)",
  Q3 = "Penetration to C-ITS Center (Q3)",
  Q4 = "Penetration to C-ITS Center (Q4)",
}

export default function Evaluate() {
  const [framework, setFramework] = useState<HeatmapEvaluationFramework>(
    HeatmapEvaluationFramework.ENTERPRISE
  );
  const tacticOptions = [
    { name: `All Selected (${frameworkMap[framework].length})` },
    ...frameworkMap[framework],
  ].map((option) => option.name);
  const [reportType, setReportType] = useState<EvaluationReportTypes>(
    EvaluationReportTypes.HEATMAP
  );
  const [round, setRound] = useState<DUMMY_ROUND_OPTIONS>(
    DUMMY_ROUND_OPTIONS.ALL
  );

  const [selectedTactic, setSelectedTactic] = useState(tacticOptions[0]);

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
        roundOptions={Object.values(DUMMY_ROUND_OPTIONS)}
        round={round}
        setRound={setRound}
        tactics={selectedTactic}
        tacticOptions={tacticOptions}
        setTactics={setSelectedTactic}
        framework={framework}
        setFramework={setFramework}
      />
      <div className="flex flex-col gap-4 p-6 bg-base-900">
        {/* Main Content */}
        {reportType === "Heat Map" && (
          <HeatmapBoard
            selectedTactic={selectedTactic}
            framework={framework}
            sortType={"impact"}
            round={round}
          />
        )}

        {reportType === "Resilience Trending" && (
          <ResilienceChart round={round} />
        )}

        {reportType === "Metrics" && (
          <MetricsBoard
            score={
              resilienceData.find((val) => val.round === round)?.score || 0
            }
            round={round}
          />
        )}

        {reportType === "Drilldown Report" && <DrillDownTable round={round} />}
      </div>
    </div>
  );
}
