import { testedResults } from "@/api/evaluate/data";
import { RawTactic, tacticsDataEnterprise } from "./enterprise/enterpriseData";
import { tacticsDataMobile } from "./mobile/mobileData";
import { tacticsDataICS } from "./ics/icsData";
import {
  HeatmapEvaluationFramework,
  OutcomeType,
  SeverityEnum,
  SortType,
  SubTechnique,
  Tactic,
  Technique,
} from "./types";

// -------------------- Constants --------------------
export const IMPACT_ORDER: Record<SeverityEnum, number> = {
  [SeverityEnum.Weakest]: 5,
  [SeverityEnum.Minimal]: 4,
  [SeverityEnum.Lower]: 3,
  [SeverityEnum.Moderate]: 2,
  [SeverityEnum.Strong]: 1,
  [SeverityEnum.NoTestCoverage]: 0,
};

const PASS_SET = new Set(["blocked", "alert"]);

export const frameworkMap: Record<HeatmapEvaluationFramework, RawTactic[]> = {
  [HeatmapEvaluationFramework.ENTERPRISE]: tacticsDataEnterprise,
  [HeatmapEvaluationFramework.MOBILE]: tacticsDataMobile,
  [HeatmapEvaluationFramework.ICS]: tacticsDataICS,
};

// -------------------- Helpers --------------------
const getRoundFilteredData = (round: string) =>
  round.startsWith("All")
    ? testedResults
    : testedResults.filter((item) => item.phase === round);

const normalizeTactic = (t: string) =>
  t.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

const normalizeTechniqueId = (id: string) => id.split(".")[0];

const isPassed = (outcome: string): boolean =>
  PASS_SET.has(outcome.toLowerCase());

const normalizeOutcome = (outcome: string): OutcomeType => {
  const o = outcome.toLowerCase();
  if (o === "blocked" || o === "block") return "Block";
  if (o === "alert" || o === "alerted") return "Alert";
  if (o === "logged") return "Logged";
  return "None";
};

const mapToSeverityEnum = (outcome: string): SeverityEnum => {
  switch (normalizeOutcome(outcome)) {
    case "Block":
    case "Alert":
      return SeverityEnum.Strong;
    case "Logged":
      return SeverityEnum.Minimal;
    case "None":
    default:
      return SeverityEnum.Weakest;
  }
};

const mapPercentageToSeverity = (
  percent: number,
  total: number
): SeverityEnum => {
  if (total === 0) return SeverityEnum.NoTestCoverage;
  if (percent <= 20) return SeverityEnum.Weakest;
  if (percent <= 40) return SeverityEnum.Minimal;
  if (percent <= 60) return SeverityEnum.Lower;
  if (percent <= 80) return SeverityEnum.Moderate;
  return SeverityEnum.Strong;
};

// -------------------- Core Tactic Tree Computation --------------------
export const getTacticTree = (round: string): Tactic[] => {
  const filtered = getRoundFilteredData(round);

  const tacticMap = new Map<
    string,
    Map<
      string,
      {
        name: string;
        _pass: number;
        _total: number;
        _sub: SubTechnique[];
      }
    >
  >();

  for (const item of filtered) {
    const tactic = normalizeTactic(item.tactic);
    const fullId = item.techniqueId;
    const parentId = normalizeTechniqueId(fullId);
    const passed = isPassed(item.outcome) ? 1 : 0;
    const severity = mapToSeverityEnum(item.outcome);

    if (!tacticMap.has(tactic)) {
      tacticMap.set(tactic, new Map());
    }

    const techMap = tacticMap.get(tactic)!;

    if (!techMap.has(parentId)) {
      techMap.set(parentId, {
        name: item.technique,
        _pass: 0,
        _total: 0,
        _sub: [],
      });
    }

    const tech = techMap.get(parentId)!;
    tech._pass += passed;
    tech._total += 1;

    tech._sub.push({
      id: fullId + "-" + tech._sub.length,
      name: item.testCase,
      severity,
      description: item.testCase,
    });
  }

  const result: Tactic[] = [];

  for (const [tacticName, techMap] of tacticMap.entries()) {
    const techniques: Technique[] = [];

    for (const [techId, data] of techMap.entries()) {
      const score =
        data._total > 0 ? +((data._pass / data._total) * 100).toFixed(1) : 0;

      techniques.push({
        id: techId,
        name: data.name,
        resilienceScore: score,
        severity: mapPercentageToSeverity(score, data._total),
        topCount: data._pass,
        bottomCount: data._total,
        subtechniques: data._sub,
      });
    }

    result.push({ name: tacticName, techniques });
  }

  return result;
};

// -------------------- Utilities --------------------
export function flattenTacticTree(
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

export function replaceTechniquesByIds(
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
      return replacement
        ? {
            ...tech,
            ...replacement,
            subtechniques: tech.subtechniques ?? [],
          }
        : tech;
    }),
  }));
}

// -------------------- Combined Data Entry Point --------------------
export function getProcessedTacticsData(
  round: string,
  framework: HeatmapEvaluationFramework,
  sortType: SortType,
  selectedTactic: string
): Tactic[] {
  const baseFramework = frameworkMap[framework] ?? [];
  const evaluated = getTacticTree(round); // Tactic[]
  const replacements = flattenTacticTree(evaluated);
  const updatedRaw = replaceTechniquesByIds(baseFramework, replacements); // RawTactic[]
  const selectedUpdatedRaw = selectedTactic.startsWith("All")
    ? updatedRaw
    : updatedRaw.filter((item) => item.name === selectedTactic);

  // Convert RawTactic[] to Tactic[]
  const converted: Tactic[] = selectedUpdatedRaw.map((t) => ({
    name: t.name,
    techniques: t.techniques.map((tech) => {
      return {
        id: tech.id,
        name: tech.name,
        resilienceScore: Math.round((tech.topCount / tech.bottomCount) * 100),
        severity: tech.severity ?? SeverityEnum.NoTestCoverage,
        topCount: tech.topCount ?? 0,
        bottomCount: tech.bottomCount ?? 0,
        subtechniques: tech.subtechniques ?? [],
      };
    }),
  }));

  // Sort techniques in each tactic
  return converted.map((tactic) => {
    const sorted = [...tactic.techniques].sort((a, b) => {
      if (sortType === "ALPHABETICAL") {
        return a.name.localeCompare(b.name);
      }
      const aImpact =
        IMPACT_ORDER[a.severity ?? SeverityEnum.NoTestCoverage] ?? 0;
      const bImpact =
        IMPACT_ORDER[b.severity ?? SeverityEnum.NoTestCoverage] ?? 0;
      return bImpact - aImpact;
    });

    return { ...tactic, techniques: sorted };
  });
}
