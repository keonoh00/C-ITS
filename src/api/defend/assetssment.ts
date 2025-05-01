import { proxyFetch } from "..";
export interface OperationPlanner {
  params: Record<string, unknown>;
  allow_repeatable_abilities: boolean;
  stopping_conditions: unknown[];
  plugin: string;
  name: string;
  id: string;
  ignore_enforcement_modules: unknown[];
  module: string;
  description: string;
}

export interface OperationAdversary {
  created: string;
  planner_id: string;
  objective: string;
  atomic_ordering: string[];
  name: string;
  template_type: string;
  has_repeatable_abilities: boolean;
  adversary_id: string;
  tags: string[];
  last_modified: string;
  plugin: string | null;
  description: string;
}

export interface OperationObjectiveGoal {
  count: number;
  target: string;
  operator: string;
  achieved: boolean;
  value: string;
}

export interface OperationObjective {
  percentage: number;
  name: string;
  goals: OperationObjectiveGoal[];
  id: string;
  description: string;
}

export interface OperationSource {
  relationships: unknown[];
  rules: unknown[];
  adjustments: unknown[];
  facts: unknown[];
  name: string;
  id: string;
  plugin: string;
}

export interface OperationAgent {
  trusted: boolean;
  exe_name: string;
  pid: number;
  proxy_receivers: Record<string, unknown>;
  proxy_chain: unknown[];
  origin_link_id: string;
  privilege: string;
  host_ip_addrs: string[];
  upstream_dest: string;
  last_seen: string;
  created: string;
  sleep_min: number;
  paw: string;
  executors: string[];
  links: unknown[];
  ppid: number;
  location: string;
  deadman_enabled: boolean;
  group: string;
  display_name: string;
  host: string;
  platform: string;
  sleep_max: number;
  architecture: string;
  username: string;
  contact: string;
  available_contacts: string[];
  pending_contact: string;
  server: string;
  watchdog: number;
}

export interface OperationItem {
  planner: OperationPlanner;
  adversary: OperationAdversary;
  group: string;
  visibility: number;
  objective: OperationObjective | string;
  autonomous: number;
  use_learning_parsers: boolean;
  start: string;
  source: OperationSource;
  state: string;
  name: string;
  host_group: OperationAgent[];
  obfuscator: string;
  id: string;
  jitter: string;
  auto_close: boolean;
  chain: unknown[];
}

export type OperationResponse = OperationItem[];

export async function fetchOperations(log = false): Promise<OperationResponse> {
  const path = "/api/v2/operations";
  const headers = {
    Key: "BLUEADMIN123",
  };

  const data = await proxyFetch({
    path,
    method: "GET",
    headers,
    body: { name: "" },
  });

  if (log) {
    console.log("PROXY FETCH Request:");
    console.log("Path:", path);
    console.log("Method: GET");
    console.log("Headers:", headers);
    console.log("Response Data:", data);
  }

  return data as OperationResponse;
}
