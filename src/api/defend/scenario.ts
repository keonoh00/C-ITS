import { proxyFetch } from "..";

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

export async function fetchAdversaries(log = false): Promise<Adversary[]> {
  const path = "/api/v2/adversaries";

  const headers = {
    Key: "BLUEADMIN123",
  };

  const data = await proxyFetch({
    path,
    method: "GET",
    headers,
  });

  if (log) {
    console.log("PROXY FETCH Request:");
    console.log("Path:", path);
    console.log("Method: GET");
    console.log("Headers:", headers);
    console.log("Response Data:", data);
  }

  return data as Adversary[];
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

export async function fetchAbilityDetail(
  abilityId: string,
  log = false
): Promise<AbilityDetail> {
  const path = `/api/v2/abilities/${abilityId}`;

  const headers = {
    Key: "BLUEADMIN123",
  };

  const data = await proxyFetch({
    path,
    method: "GET",
    headers,
  });

  if (log) {
    console.log("PROXY FETCH Request:");
    console.log("Path:", path);
    console.log("Method: GET");
    console.log("Headers:", headers);
    console.log("Response Data:", data);
  }

  return data as AbilityDetail;
}

export type EnrichedAdversary = Omit<Adversary, "atomic_ordering"> & {
  atomic_ordering: AbilityDetail[];
};

export type EnrichedAdversaryResponse = EnrichedAdversary[];

export async function fetchAdversariesWithAbilities(
  log = false
): Promise<EnrichedAdversary[]> {
  const path = "/api/v2/adversaries";
  const headers = {
    Key: "BLUEADMIN123",
  };

  const adversaries: Adversary[] = await proxyFetch({
    path,
    method: "GET",
    headers,
  });

  if (log) {
    console.log("Fetched adversaries:", adversaries);
  }

  // Step 1: Collect all unique ability IDs
  const abilityIds = [
    ...new Set(adversaries.flatMap((a) => a.atomic_ordering).filter(Boolean)),
  ] as string[];

  // Step 2: Fetch all ability details in parallel
  const abilityDetailMap = new Map<string, AbilityDetail>();
  await Promise.all(
    abilityIds.map(async (id) => {
      try {
        const detail = await proxyFetch({
          path: `/api/v2/abilities/${id}`,
          method: "GET",
          headers,
        });
        abilityDetailMap.set(id, detail as AbilityDetail);
      } catch (err) {
        console.warn(`Failed to fetch ability: ${id}`, err);
      }
    })
  );

  // Step 3: Replace atomic_ordering string IDs with full details
  const enrichedAdversaries = adversaries.map((adversary) => ({
    ...adversary,
    atomic_ordering: (adversary.atomic_ordering || [])
      .map((id) => abilityDetailMap.get(id))
      .filter(Boolean) as AbilityDetail[],
  }));

  if (log) {
    console.log("Enriched adversaries with abilities:", enrichedAdversaries);
  }

  return enrichedAdversaries;
}
