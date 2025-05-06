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
  return [
    {
      role: "Office-Employee",
      data: [
        {
          attack_id: "76c8f978-cc38-4281-8236-ecb7fae8f99c",
          index: "1",
          attack_name: "Discover AD Server",
          next_step: ["7f843cac-c92b-4704-9972-bd47726c53ea"],
          findings: [],
          requirements: [],
          technique_id: "T1018",
          technique_name: "Remote System Discovery",
          sub_index: "",
          sub_group: "",
        },
        {
          attack_id: "7f843cac-c92b-4704-9972-bd47726c53ea",
          index: "2",
          attack_name: "Create SMB session to AD Server (2)",
          next_step: ["f05e54049cfa10bc4018bf9e68676cpp"],
          findings: [],
          requirements: [],
          technique_id: "T1021",
          technique_name: "Remote Services: SMB/Windows Admin Shares",
          sub_index: "",
          sub_group: "",
        },
        {
          attack_id: "f05e54049cfa10bc4018bf9e68676cpp",
          index: "3",
          attack_name: "Transfer RAT Agent_1",
          next_step: ["0c752dce-9302-4465-805f-522650aecepp"],
          findings: [],
          requirements: [],
          technique_id: "T1021",
          technique_name: "Remote Services: SMB/Windows Admin Shares",
          sub_index: "",
          sub_group: "",
        },
        {
          attack_id: "0c752dce-9302-4465-805f-522650aecepp",
          index: "4",
          attack_name: "Execute RAT Agent_1",
          next_step: ["beb369da-ca3e-4748-af50-c2484e4a1817"],
          findings: [],
          requirements: [],
          technique_id: "T1569",
          technique_name: "System Services: Service Execution",
          sub_index: "",
          sub_group: "",
        },
      ],
    },
    {
      role: "AD_SERVER",
      data: [
        {
          attack_id: "beb369da-ca3e-4748-af50-c2484e4a1817",
          index: "5",
          attack_name: "Discover C-ITS Operator",
          next_step: ["d7b6968d-04c0-4d0e-9d43-626a2ba6e34f"],
          findings: [],
          requirements: [],
          technique_id: "T1087",
          technique_name: "Account Discovery: Domain Account",
          sub_index: "",
          sub_group: "",
        },
        {
          attack_id: "d7b6968d-04c0-4d0e-9d43-626a2ba6e34f",
          index: "6",
          attack_name: "Create SMB session to C-ITS Operator",
          next_step: ["f05e54049cfa10bc4018bf9e68676cc1"],
          findings: [],
          requirements: ["host.ip.address"],
          technique_id: "T1021",
          technique_name: "Remote Services: SMB/Windows Admin Shares",
          sub_index: "",
          sub_group: "",
        },
        {
          attack_id: "f05e54049cfa10bc4018bf9e68676cc1",
          index: "7",
          attack_name: "Transfer RAT Agent_2",
          next_step: ["0c752dce-9302-4465-805f-522650aece31"],
          findings: [],
          requirements: [],
          technique_id: "T1021",
          technique_name: "Remote Services: SMB/Windows Admin Shares",
          sub_index: "",
          sub_group: "",
        },
        {
          attack_id: "0c752dce-9302-4465-805f-522650aece31",
          index: "8",
          attack_name: "Execute RAT Agent_2",
          next_step: ["473e5707-5786-4f53-934f-22175c1059b0"],
          findings: [],
          requirements: [],
          technique_id: "T1569",
          technique_name: "System Services: Service Execution",
          sub_index: "",
          sub_group: "",
        },
      ],
    },
    {
      role: "C-ITS-Operator",
      data: [
        {
          attack_id: "473e5707-5786-4f53-934f-22175c1059b0",
          index: "9",
          attack_name: "Credential Dumping(MimiKatz)",
          next_step: ["31e07036-7e57-4405-854e-827b9ef8b434"],
          findings: [],
          requirements: [],
          technique_id: "T1003",
          technique_name: "OS Credential Dumping: LSASS Memory",
          sub_index: "",
          sub_group: "",
        },
        {
          attack_id: "31e07036-7e57-4405-854e-827b9ef8b434",
          index: "10",
          attack_name: "Read Dumped Credentials",
          next_step: ["2984aab9-8726-421b-a090-6d75bc54c75a"],
          findings: [],
          requirements: [],
          technique_id: "T1003",
          technique_name: "OS Credential Dumping: LSASS Memory",
          sub_index: "",
          sub_group: "",
        },
        {
          attack_id: "2984aab9-8726-421b-a090-6d75bc54c75a",
          index: "11",
          attack_name: "Brute-Force Dumped Credentials",
          next_step: ["de4837ba-b773-4392-a0b7-04656403b95f"],
          findings: [],
          requirements: [],
          technique_id: "T1110",
          technique_name: "Brute Force",
          sub_index: "",
          sub_group: "",
        },
        {
          attack_id: "de4837ba-b773-4392-a0b7-04656403b95f",
          index: "12",
          attack_name: "Discover RSU-Manage-Server",
          next_step: ["4bb8dc1e-d5e7-4114-920c-d8d462f19b7a"],
          findings: [],
          requirements: [],
          technique_id: "T1018",
          technique_name: "Remote System Discovery",
          sub_index: "",
          sub_group: "",
        },
        {
          attack_id: "4bb8dc1e-d5e7-4114-920c-d8d462f19b7a",
          index: "13",
          attack_name: "Lateral Movement to RSU-Manage-Server",
          next_step: [""],
          findings: [],
          requirements: [],
          technique_id: "T1569",
          technique_name: "System Services: Service Execution",
          sub_index: "",
          sub_group: "",
        },
      ],
    },
  ];

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
