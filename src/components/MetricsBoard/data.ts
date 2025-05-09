import { drillDownData } from "../DrilldownReportTable/data";

export interface DataEntry {
  name: string;
  Block: number;
  Alert: number;
  Logged: number;
  None: number;
}

type OutcomeType = "Block" | "Alert" | "Logged" | "None";

const OUTCOME_TYPES: OutcomeType[] = ["Block", "Alert", "Logged", "None"];

function normalizeTactic(tactic: string): string {
  return tactic.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

const getRoundFilteredData = (_round: string) =>
  _round.startsWith("All")
    ? drillDownData
    : drillDownData.filter((item) => item.phase === _round);

export const getMetriciesData: (round: string) => DataEntry[] = (round) => {
  const counts = new Map<string, DataEntry>();
  const filteredData = getRoundFilteredData(round);

  for (const item of filteredData) {
    const tactic = normalizeTactic(item.tactic);
    const outcome = item.outcome as OutcomeType;

    if (!counts.has(tactic)) {
      counts.set(tactic, {
        name: tactic,
        Block: 0,
        Alert: 0,
        Logged: 0,
        None: 0,
      });
    }

    if (OUTCOME_TYPES.includes(outcome)) {
      counts.get(tactic)![outcome]++;
    }
  }

  return Array.from(counts.values());
};

interface FieldItem {
  title: string;
  count: number;
  children?: FieldItem[];
}

function normalizeOutcome(
  outcome: string
): "Blocked" | "Alert" | "Logged" | "None" {
  switch (outcome) {
    case "Blocked":
    case "Block":
      return "Blocked";
    case "Alert":
    case "Alerted":
      return "Alert";
    case "Logged":
      return "Logged";
    case "None":
    default:
      return "None";
  }
}

export const getFieldTreeData: (round: string) => FieldItem[] = (
  round: string
) => {
  const filteredData = getRoundFilteredData(round);

  let blocked = 0;
  let alert = 0;
  let logged = 0;
  let none = 0;

  for (const item of filteredData) {
    const outcome = normalizeOutcome(item.outcome);

    switch (outcome) {
      case "Blocked":
        blocked++;
        break;
      case "Alert":
        alert++;
        break;
      case "Logged":
        logged++;
        break;
      case "None":
        none++;
        break;
    }
  }

  const total = filteredData.length;
  const passed = blocked + alert;
  const failed = logged + none;

  return [
    {
      title: "Campaigns",
      count: total,
    },
    {
      title: "Passed",
      count: passed,
      children: [
        { title: "Blocked", count: blocked },
        { title: "Alert", count: alert },
      ],
    },
    {
      title: "Failed",
      count: failed,
      children: [
        { title: "Logged", count: logged },
        { title: "None", count: none },
      ],
    },
  ];
};
