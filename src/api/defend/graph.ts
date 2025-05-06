import { proxyFetch } from "..";

export interface AttackStep {
  attack_id: string;
  index: string;
  attack_name: string;
  next_step: string[];
  findings: unknown[];
  requirements: string[];
  technique_id: string;
  technique_name: string;
  sub_index: string;
  sub_group: string;
}

export interface AttackRoleGroup {
  role: string;
  data: AttackStep[];
}

export async function fetchAttackGraphConfiguration(
  graphId: string,
  log: boolean = false
): Promise<AttackRoleGroup[]> {
  const path = `/restapi/graph/configuration/${graphId}`;

  const headers: Record<string, string> = {
    Key: "ADMIN123",
  };

  const response = await proxyFetch({
    path,
    method: "GET",
    headers,
  });

  if (log) {
    console.log("PROXY FETCH Request:");
    console.log("→ Path:", path);
    console.log("→ Method:", "GET");
    console.log("→ Headers:", headers);
    console.log("← Response Data:", response);
  }

  return response as AttackRoleGroup[];
}
