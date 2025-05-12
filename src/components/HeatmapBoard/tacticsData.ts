import { drillDownData } from "../DrilldownReportTable/data";
import { SubTechnique, RawTechnique } from "./enterprise/enterpriseData";

export enum SeverityEnum {
  NoTestCoverage = "No Test Coverage",
  Weakest = "Weakest",
  Minimal = "Minimal",
  Lower = "Lower",
  Moderate = "Moderate",
  Strong = "Strong",
}

export interface Technique extends RawTechnique {
  resilienceScore: number;
}

export interface Tactic {
  name: string;
  techniques: Technique[];
}

export enum HeatmapEvaluationFramework {
  ENTERPRISE = "Enterprise",
  MOBILE = "Mobile",
  ICS = "ICS",
}

export enum EvaluationReportTypes {
  RESILIENCETRENDING = "Resilience Trending",
  HEATMAP = "Heat Map",
  DRILLDOWNREPORT = "Drilldown Report",
  METRICS = "Metrics",
}

export type HeatmapEvaluationFrameworkKeyType =
  keyof typeof HeatmapEvaluationFramework;

const getRoundFilteredData = (_round: string) =>
  _round.startsWith("All")
    ? drillDownData
    : drillDownData.filter((item) => item.phase === _round);

function mapToSeverityEnum(raw: string): SeverityEnum {
  switch (raw) {
    case "Blocked":
    case "Alert":
      return SeverityEnum.Strong;
    case "Logged":
      return SeverityEnum.Minimal;
    case "None":
      return SeverityEnum.Weakest;
    default:
      return SeverityEnum.NoTestCoverage;
  }
}

function normalizeTactic(tactic: string): string {
  return tactic.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

function normalizeTechniqueId(techniqueId: string): string {
  return techniqueId.split(".")[0]; // T1003.001 → T1003
}
function isPassed(outcome: string): boolean {
  return outcome === "Blocked" || outcome === "Alert";
}

function mapPercentageToSeverity(passedRatio: number): SeverityEnum {
  if (passedRatio === 0) return SeverityEnum.NoTestCoverage;
  if (passedRatio > 80) return SeverityEnum.Strong;
  if (passedRatio > 60) return SeverityEnum.Moderate;
  if (passedRatio > 40) return SeverityEnum.Lower;
  if (passedRatio > 20) return SeverityEnum.Minimal;
  return SeverityEnum.Weakest;
}

export const getTacticTree = (round: string): Tactic[] => {
  const filtered = getRoundFilteredData(round);

  const tacticMap = new Map<
    string,
    Map<
      string,
      Technique & {
        _sub: SubTechnique[];
        _pass: number;
        _total: number;
      }
    >
  >();

  for (const item of filtered) {
    const tactic = normalizeTactic(item.tactic);
    const fullId = item.techniqueId;
    const parentId = normalizeTechniqueId(fullId);
    const passed = isPassed(item.outcome) ? 1 : 0;

    if (!tacticMap.has(tactic)) {
      tacticMap.set(tactic, new Map());
    }

    const techMap = tacticMap.get(tactic)!;

    if (!techMap.has(parentId)) {
      techMap.set(parentId, {
        id: parentId,
        name: item.technique,
        resilienceScore: 0,
        severity: SeverityEnum.NoTestCoverage,
        topCount: 0,
        bottomCount: 0,
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
      severity: mapToSeverityEnum(item.outcome),
      description: item.testCase,
      topCount: 0,
      bottomCount: 0,
    });
  }

  const tactics: Tactic[] = [];

  for (const [tacticName, techMap] of tacticMap.entries()) {
    const techniques: Technique[] = [];

    for (const [id, tech] of techMap.entries()) {
      const score = tech._total > 0 ? (tech._pass / tech._total) * 100 : 0;

      techniques.push({
        id,
        name: tech.name,
        resilienceScore: score,
        severity: mapPercentageToSeverity(score),
        topCount: tech._pass,
        bottomCount: tech._total,
        subtechniques: tech._sub,
      });
    }

    tactics.push({ name: tacticName, techniques });
  }

  return tactics;
};
