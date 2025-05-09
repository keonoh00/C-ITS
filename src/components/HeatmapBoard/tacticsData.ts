import { drillDownData } from "../DrilldownReportTable/data";

export interface SubTechnique {
  name: string;
  id: string;
  outcome: OutcomeEnum;
  topCount: number;
  bottomCount: number;
  description: string;
}

export enum OutcomeEnum {
  NoTestCoverage = "No Test Coverage",
  OutcomeTBD = "Outcome TBD",
  Weakest = "Weakest",
  Minimal = "Minimal",
  Lower = "Lower",
  Moderate = "Moderate",
  Strong = "Strong",
}

export interface Technique {
  name: string;
  id: string;
  outcome: OutcomeEnum;
  topCount: number;
  bottomCount: number;
  subtechniques?: SubTechnique[];
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

const getRoundFilteredData = (_round: string) =>
  _round.startsWith("All")
    ? drillDownData
    : drillDownData.filter((item) => item.phase === _round);

export type HeatmapEvaluationFrameworkKeyType =
  keyof typeof HeatmapEvaluationFramework;

function mapToOutcomeEnum(raw: string): OutcomeEnum {
  switch (raw) {
    case "Blocked":
    case "Alert":
      return OutcomeEnum.Strong;
    case "Logged":
      return OutcomeEnum.Minimal;
    case "None":
      return OutcomeEnum.Weakest;
    default:
      return OutcomeEnum.OutcomeTBD;
  }
}

function normalizeTactic(tactic: string): string {
  return tactic.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

function normalizeTechniqueId(techniqueId: string): string {
  return techniqueId.split(".")[0];
}

export const getTacticTree = (round: string): Tactic[] => {
  const filtered = getRoundFilteredData(round);

  const tacticMap = new Map<
    string,
    Map<string, Technique & { _sub: SubTechnique[] }>
  >();

  for (const item of filtered) {
    const tactic = normalizeTactic(item.tactic);
    const fullId = item.techniqueId;
    const parentId = normalizeTechniqueId(fullId);
    const outcome = mapToOutcomeEnum(item.outcome);

    if (!tacticMap.has(tactic)) {
      tacticMap.set(tactic, new Map());
    }

    const techMap = tacticMap.get(tactic)!;

    if (!techMap.has(parentId)) {
      techMap.set(parentId, {
        id: parentId,
        name: item.technique,
        outcome,
        topCount: 0,
        bottomCount: 0,
        _sub: [], // temporary holder
      });
    }

    const tech = techMap.get(parentId)!;

    tech._sub.push({
      id: fullId + "-" + tech._sub.length,
      name: item.testCase,
      outcome,
      topCount: 0,
      bottomCount: 0,
      description: item.testCase,
    });
  }

  const tactics: Tactic[] = [];

  for (const [tacticName, techMap] of tacticMap.entries()) {
    const techniques: Technique[] = [];

    for (const [id, tech] of techMap.entries()) {
      techniques.push({
        id,
        name: tech.name,
        outcome: tech.outcome,
        topCount: tech._sub.length,
        bottomCount: tech._sub.length,
        subtechniques: tech._sub,
      });
    }

    tactics.push({ name: tacticName, techniques });
  }

  return tactics;
};
