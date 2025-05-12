"use client";

import React, { useMemo, useRef, useState, useEffect } from "react";
import {
  getTacticTree,
  HeatmapEvaluationFramework,
  SeverityEnum,
  Tactic,
  Technique,
} from "./tacticsData";
import HeatmapCard from "./HeatmapCard";
import Legend from "./Legend";
import {
  RawTactic,
  RawTechnique,
  tacticsDataEnterprise,
} from "./enterprise/enterpriseData";
import { tacticsDataMobile } from "./mobile/mobileData";
import { tacticsDataICS } from "./ics/icsData";

interface HeatmapBoardProps {
  selectedTactic: string;
  framework: HeatmapEvaluationFramework;
  round: string;
  sortType: "alphabetical" | "impact";
}

export const frameworkMap: Record<HeatmapEvaluationFramework, RawTactic[]> = {
  [HeatmapEvaluationFramework.ENTERPRISE]: tacticsDataEnterprise,
  [HeatmapEvaluationFramework.MOBILE]: tacticsDataMobile,
  [HeatmapEvaluationFramework.ICS]: tacticsDataICS,
};

const impactOrder: Record<SeverityEnum, number> = {
  [SeverityEnum.Weakest]: 5,
  [SeverityEnum.Minimal]: 4,
  [SeverityEnum.Lower]: 3,
  [SeverityEnum.Moderate]: 2,
  [SeverityEnum.Strong]: 1,
  [SeverityEnum.NoTestCoverage]: 0,
};

function replaceTechniquesByIds(
  data: RawTactic[],
  replacements: { id: string; newTechnique: Partial<Technique> }[]
): RawTactic[] {
  if (!replacements || replacements.length < 1) return data;
  const replacementMap = new Map(
    replacements.map((r) => [r.id, r.newTechnique])
  );

  return data.map((tactic) => ({
    ...tactic,
    techniques: tactic.techniques.map((tech) => {
      const replacement = replacementMap.get(tech.id);
      return replacement ? { ...tech, ...replacement } : tech;
    }),
  }));
}

function flattenTacticTree(
  tactics: Tactic[]
): { id: string; newTechnique: Partial<Technique> }[] {
  return tactics.flatMap((tactic) =>
    tactic.techniques.map((tech) => ({
      id: tech.id,
      newTechnique: {
        id: tech.id,
        severity: tech.severity,
        topCount: tech.topCount,
        bottomCount: tech.bottomCount,
      },
    }))
  );
}

export default function HeatmapBoard({
  selectedTactic,
  framework,
  round,
  sortType,
}: HeatmapBoardProps) {
  const tacticsData: RawTactic[] = useMemo(() => {
    const original = frameworkMap[framework] ?? [];
    const replacements = flattenTacticTree(getTacticTree(round));

    return replaceTechniquesByIds(original, replacements);
  }, [framework, round]);

  const filteredTactics: RawTactic[] = useMemo(() => {
    if (selectedTactic.startsWith("All Selected")) return tacticsData;
    return tacticsData.filter((t) => t.name === selectedTactic);
  }, [selectedTactic, tacticsData]);

  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(false);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handleScroll = () => {
      setShowLeft(el.scrollLeft > 0);
      setShowRight(el.scrollLeft + el.clientWidth < el.scrollWidth);
    };

    handleScroll();
    el.addEventListener("scroll", handleScroll);
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  const sortedTechniques = (techniques: RawTechnique[]): RawTechnique[] => {
    return [...techniques].sort((a, b) => {
      if (sortType === "alphabetical") {
        return a.name.localeCompare(b.name);
      } else if (sortType === "impact") {
        const aImpact = impactOrder[a.severity ?? "No Test Coverage"] ?? 0;
        const bImpact = impactOrder[b.severity ?? "No Test Coverage"] ?? 0;
        return bImpact - aImpact;
      }
      return 0;
    });
  };

  return (
    <div className="w-full h-full flex flex-col">
      <Legend />
      <div className="relative">
        {showLeft && (
          <div className="absolute top-6 left-0 w-30 h-full bg-gradient-to-r from-base-900 to-transparent z-10 pointer-events-none" />
        )}
        {showRight && (
          <div className="absolute top-6 right-0 w-30 h-full bg-gradient-to-l from-base-900 to-transparent z-10 pointer-events-none" />
        )}

        <div
          ref={scrollRef}
          className="flex-1 overflow-x-auto overflow-y-auto mt-6 pb-4"
        >
          <div className="flex gap-4 min-w-fit justify-around">
            {filteredTactics.map((tactic, idx) => (
              <div
                key={idx}
                className="flex-shrink-0 w-[145px] flex flex-col rounded-lg p-2"
              >
                <div className="text-xs font-bold text-neutral-300 text-center mb-2 h-[40px] flex flex-col justify-center items-center space-y-1">
                  <p className="max-w-full break-words whitespace-normal text-center">
                    {tactic.name}
                  </p>
                  <p className="font-medium text-gray-50 text-xs">
                    {tactic.techniques.length} Techniques
                  </p>
                </div>

                <div className="flex flex-col gap-2">
                  {sortedTechniques(tactic.techniques).map(
                    (technique, tIdx) => (
                      <div
                        key={tIdx}
                        className="flex flex-col gap-2 overflow-y-auto"
                      >
                        <HeatmapCard technique={technique} />
                      </div>
                    )
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
