export interface AttackPagination {
  page: number;
  items_per_page: number;
  total_items: number;
}

export interface AttackVariation {
  description: string;
  command: string;
}

export interface AttackExecutor {
  timeout: number;
  name: string;
  payloads: string[];
  command: string;
  build_target: string | null;
  additional_info: Record<string, unknown>;
  code: string | null;
  cleanup: string[];
  uploads: string[];
  platform: string;
  parsers: AttackParser[];
  language: string | null;
  variations: AttackVariation[];
}

export interface AttackParserConfig {
  source: string;
  custom_parser_vals: Record<string, unknown>;
  target: string;
  edge: string;
}

export interface AttackParser {
  parserconfigs: AttackParserConfig[];
  module: string;
}

export interface AttackDataItem {
  plugin: string;
  buckets: string[];
  additional_info: Record<string, unknown>;
  mitre_domain: string;
  requirements: unknown[];
  technique_id: string;
  name: string;
  last_modified: string;
  description: string;
  executors: AttackExecutor[];
  ability_id: string;
  technique_name: string;
  tactic: string;
  repeatable: boolean;
  threat_group: string | string[];
  cve_info: string | string[];
  singleton: boolean;
  delete_payload: boolean;
  privilege: string;
  access: Record<string, unknown>;
}

export interface AttackSearchKeyword {
  name: string;
  platform: string;
  mitre_domain: string;
  tactic: string;
  threat_group: string;
}

export interface AttackFilterCount {
  platform: {
    total: number;
    darwin: number;
    linux: number;
    windows: number;
    unknown: number;
  };
  mitre_domain: {
    total: number;
    Enterprise: number;
  };
  tactic: Record<string, number>;
  threat_group: {
    total: number;
    undefined: number;
  };
}

export interface AttackResponse {
  pagenation: AttackPagination;
  data: AttackDataItem[];
  search_keyword: AttackSearchKeyword;
  filter_count: AttackFilterCount;
}

export interface AttackRequest {
  query?: string;
  page?: number;
  itemsPerPage?: number;
}

export async function fetchAttacks({
  query = "",
  page = 1,
  itemsPerPage = 10,
}: AttackRequest): Promise<AttackResponse> {
  const response = await fetch("http://192.168.5.111:8888/attacks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Key: "BLUEADMIN123",
    },
    body: JSON.stringify({
      page,
      items_per_page: itemsPerPage,
      name: query,
      platform: query,
      mitre: query,
      tactic: query,
      threat_group: query,
    }),
    cache: "no-store", // important for fresh data in Next.js
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch attacks: ${response.statusText}`);
  }

  const data = (await response.json()) as AttackResponse;
  return data;
}
