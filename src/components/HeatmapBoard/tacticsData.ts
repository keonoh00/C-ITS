import { tacticsDataEnterprise } from "./enterprise/enterpriseData";
import { tacticsDataICS } from "./ics/icsData";
import { tacticsDataMobile } from "./mobile/mobileData";

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

const _TacticOptions: string[] = Array.from(
  new Set(
    [...tacticsDataEnterprise, ...tacticsDataICS, ...tacticsDataMobile].map(
      (item) => item.name
    )
  )
);

export enum EvaluationReportTypes {
  RESILIENCETRENDING = "Resilience Trending",
  HEATMAP = "Heat Map",
  DRILLDOWNREPORT = "Drilldown Report",
  METRICS = "Metrics",
}

export const TacticOptions = [
  `All Selected (${_TacticOptions.length})`,
  ..._TacticOptions,
];

export type HeatmapEvaluationFrameworkKeyType =
  keyof typeof HeatmapEvaluationFramework;
