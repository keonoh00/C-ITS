import { proxyFetch } from "..";

const API_KEY = "BLUEADMIN123";

const headers = {
  Key: API_KEY,
};

const logInfo = (label: string, payload: unknown, enabled = false) => {
  if (enabled) console.log(`[INFO] ${label}:`, payload);
};

const logError = (label: string, err: unknown, enabled = false) => {
  if (enabled) console.error(`[ERROR] ${label}:`, err);
};

// Types
export interface Adversary {
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
  plugin: string;
  description: string;
}

export interface AbilityExecutor {
  code: string | null;
  parsers: unknown[];
  timeout: number;
  build_target: string | null;
  language: string | null;
  platform: string;
  additional_info: Record<string, unknown>;
  name: string;
  uploads: string[];
  variations: unknown[];
  command: string;
  payloads: string[];
  cleanup: string[];
}

export interface AbilityDetail {
  tactic: string;
  cve_info: string[];
  privilege: string;
  singleton: boolean;
  access: Record<string, unknown>;
  plugin: string;
  last_modified: string;
  executors: AbilityExecutor[];
  name: string;
  additional_info: Record<string, unknown>;
  delete_payload: boolean;
  ability_id: string;
  technique_name: string;
  threat_group: string[];
  description: string;
  requirements: unknown[];
  repeatable: boolean;
  buckets: string[];
  mitre_domain: string;
  technique_id: string;
}

export type EnrichedAdversary = Omit<Adversary, "atomic_ordering"> & {
  atomic_ordering: AbilityDetail[];
};

export type EnrichedAdversaryResponse = EnrichedAdversary[];

// Functions
export async function fetchAdversaries(log = false): Promise<Adversary[]> {
  const path = "/api/v2/adversaries";
  try {
    const data = await proxyFetch({ path, method: "GET", headers });
    logInfo("Fetched Adversaries", data, log);
    return data as Adversary[];
  } catch (err) {
    logError("fetchAdversaries failed", err, log);
    return [];
  }
}

export async function fetchAbilityDetail(
  abilityId: string,
  log = false
): Promise<AbilityDetail | null> {
  const path = `/api/v2/abilities/${abilityId}`;
  try {
    const data = await proxyFetch({ path, method: "GET", headers });
    logInfo(`Fetched Ability [${abilityId}]`, data, log);
    return data as AbilityDetail;
  } catch (err) {
    logError(`fetchAbilityDetail failed [${abilityId}]`, err, log);
    return null;
  }
}

export async function fetchAdversariesWithAbilities(
  log = false
): Promise<EnrichedAdversary[]> {
  const adversaries = await fetchAdversaries(log);
  if (!adversaries.length) return [];

  const uniqueAbilityIds = [
    ...new Set(adversaries.flatMap((a) => a.atomic_ordering)),
  ].filter(Boolean) as string[];

  const abilityDetailMap = new Map<string, AbilityDetail>();

  await Promise.all(
    uniqueAbilityIds.map(async (id) => {
      const detail = await fetchAbilityDetail(id, log);
      if (detail) abilityDetailMap.set(id, detail);
    })
  );

  const enriched = adversaries.map((adv) => ({
    ...adv,
    atomic_ordering: (adv.atomic_ordering || [])
      .map((id) => abilityDetailMap.get(id))
      .filter((d): d is AbilityDetail => Boolean(d)),
  }));

  logInfo("Enriched Adversaries", enriched, log);
  return enriched;
}
