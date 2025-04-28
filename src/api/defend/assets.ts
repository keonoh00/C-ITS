export interface Agent {
  display_name: string;
  last_seen: string;
  architecture: string;
  pending_contact: string;
  host_ip_addrs: string[];
  links: unknown[]; // or a better type if you know the link structure
  sleep_min: number;
  executors: string[];
  paw: string;
  deadman_enabled: boolean;
  available_contacts: string[];
  pid: number;
  location: string;
  contact: string;
  trusted: boolean;
  group: string;
  server: string;
  host: string;
  watchdog: number;
  privilege: string;
  proxy_receivers: Record<string, unknown>; // empty object or mapped values
  username: string;
  upstream_dest: string;
  exe_name: string;
  proxy_chain: unknown[]; // empty array for now
  sleep_max: number;
  ppid: number;
  created: string;
  platform: string;
  origin_link_id: string;
}

export async function getAgents(): Promise<Agent[]> {
  const res = await fetch("http://192.168.5.111:8888/api/v2/agents", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Key: "BLUEADMIN123",
    },
    cache: "no-store", // important: always fresh
  });

  if (!res.ok) {
    throw new Error("Failed to fetch agents");
  }

  const data = await res.json();
  return data;
}
