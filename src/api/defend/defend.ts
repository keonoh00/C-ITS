import { proxyFetch } from "..";

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
  pagenation?: AttackPagination;
  data?: AttackDataItem[];
  search_keyword?: AttackSearchKeyword;
  filter_count?: AttackFilterCount;
}

export interface AttackRequest {
  query?: string;
  page?: number;
  itemsPerPage?: number;
  log?: boolean;
}

export async function fetchAttacks({
  query = "",
  page = 1,
  itemsPerPage = 10,
  log = false,
}: AttackRequest): Promise<AttackResponse> {
  const path = "/attacks";

  const body = {
    page,
    items_per_page: itemsPerPage,
    name: query,
    platform: "",
    mitre: "",
    tactic: "",
    threat_group: "",
  };

  const headers: Record<string, string> = {
    Key: "BLUEADMIN123",
  };

  const response = await proxyFetch({
    path,
    method: "POST",
    headers,
    body,
  });

  if (log) {
    console.log("PROXY FETCH Request:");
    console.log("→ Path:", path);
    console.log("→ Method:", "POST");
    console.log("→ Headers:", headers);
    console.log("→ Body:", body);
    console.log("← Response Data:", response);
  }

  return response as AttackResponse;
}
