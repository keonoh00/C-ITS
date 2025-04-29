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
