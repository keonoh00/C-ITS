"use client";

import React from "react";
import {
  EvaluationReportTypes,
  HeatmapEvaluationFramework,
  HeatmapEvaluationFrameworkKeyType,
  TacticOptions,
} from "../HeatmapBoard/tacticsData";

interface FilterBarProps {
  reportOptions: EvaluationReportTypes[];
  reportType: EvaluationReportTypes;
  setReportType: (value: EvaluationReportTypes) => void;
  roundOptions: string[];
  round: string;
  setRound: (value: string) => void;
  tactics: string;
  setTactics: (value: string) => void;
  framework: HeatmapEvaluationFramework;
  setFramework: (value: HeatmapEvaluationFramework) => void;
}

export default function FilterBar({
  reportOptions,
  reportType,
  setReportType,
  roundOptions,
  round,
  setRound,
  tactics,
  setTactics,
  framework,
  setFramework,
}: FilterBarProps) {
  return (
    <div className="flex flex-wrap bg-base-900 p-2 rounded-md justify-between">
      <div className="flex gap-6">
        {/* Group 1: Report Type */}
        <div className="flex items-center gap-2 min-w-[200px]">
          <span className="text-sm text-orange-500 font-bold">Report Type</span>
          <select
            className="p-2 bg-base-800 border border-neutral-600 rounded text-sm text-neutral-300"
            value={reportType}
            onChange={(e) =>
              setReportType(e.target.value as EvaluationReportTypes)
            }
          >
            {reportOptions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </div>

        {/* Group 2: Round */}
        <div className="flex items-center gap-2 min-w-[200px]">
          <span className="text-sm text-neutral-400">Round</span>
          <select
            className="p-2 bg-base-800 border border-neutral-600 rounded text-sm text-neutral-300"
            value={round}
            onChange={(e) => setRound(e.target.value)}
          >
            {roundOptions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </div>

        {/* Group 3: Tactics */}
        <div className="flex items-center gap-2 min-w-[200px]">
          <span className="text-sm text-neutral-400">Tactics</span>
          <select
            className="p-2 bg-base-800 border border-neutral-600 rounded text-sm text-neutral-300"
            value={tactics}
            onChange={(e) => setTactics(e.target.value)}
          >
            {TacticOptions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Group 4: Framework */}
      {reportType === "Heat Map" && (
        <div className="flex items-center gap-2 min-w-[200px]">
          <span className="text-sm text-neutral-400">Framework</span>
          <select
            className="p-2 bg-base-800 border border-neutral-600 rounded text-sm text-neutral-300"
            value={framework}
            onChange={(e) =>
              setFramework(e.target.value as HeatmapEvaluationFramework)
            }
          >
            {Object.keys(HeatmapEvaluationFramework).map((frameworkKey) => (
              <option
                key={frameworkKey}
                value={
                  HeatmapEvaluationFramework[
                    frameworkKey as HeatmapEvaluationFrameworkKeyType
                  ]
                }
              >
                {
                  HeatmapEvaluationFramework[
                    frameworkKey as HeatmapEvaluationFrameworkKeyType
                  ]
                }
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
}
