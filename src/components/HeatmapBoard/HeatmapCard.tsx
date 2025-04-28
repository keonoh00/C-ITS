"use client";

import React from "react";
import { Technique } from "./tacticsData";

const outcomeColors = {
  "No Test Coverage": "bg-neutral-700",
  "Outcome TBD": "bg-neutral-500",
  Weakest: "bg-red-500",
  Minimal: "bg-orange-400",
  Lower: "bg-yellow-400",
  Moderate: "bg-green-400",
  Strong: "bg-green-600",
} as const;

interface HeatmapCardProps {
  technique: Technique;
}

export default function HeatmapCard({ technique }: HeatmapCardProps) {
  return (
    <div
      className={`flex rounded-md overflow-hidden border border-gray-500 ${
        outcomeColors[technique.outcome]
      } min-h-[80px] max-h-[140px] max-w-[200px] min-w-[70px]`}
    >
      {/* Left Bar */}
      <div className="flex items-start justify-center w-3 bg-gray-300">
        <span className="text-black text-[8px] mt-1">{">"}</span>
      </div>

      {/* Main Content */}
      <div className="flex flex-col justify-between flex-grow p-1 text-[9px] leading-tight overflow-hidden">
        <div className="flex w-full justify-between items-start">
          {/* Technique name */}
          <div className="font-semibold text-gray-900 text-[10px] break-words leading-snug w-[70%]">
            {technique.name}
          </div>

          {/* Top and Bottom Counter stacked */}
          <div className="flex flex-col items-center gap-0.5">
            <div className="bg-white text-black rounded px-1 text-[9px]">
              {technique.topCount}
            </div>
            <div className="bg-white text-black rounded px-1 text-[9px]">
              {technique.bottomCount}
            </div>
          </div>
        </div>

        {/* Technique ID */}
        <div className="text-[9px] text-gray-700 mt-1">{technique.id}</div>
      </div>
    </div>
  );
}
