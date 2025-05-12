import { proxyFetch } from "..";
import { OutcomeType } from "../evaluate/types";

// -------------------- Types --------------------

export interface AttackStep {
  attack_id: string;
  index: string;
  attack_name: string;
  next_step: string[];
  findings: Record<string, string[]>;
  requirements: Record<string, unknown>;
  technique_id: string;
  technique_name: string;
  sub_index: string;
  sub_group: string;
  link_ids: string[];
  hosts: Record<string, boolean[]>;
  result: {
    passed: number;
    failed: number;
  };
}

export interface GraphFlattenBlock extends AttackStep {
  target: string;
  status: "Complete" | "Failed";
  outcome: OutcomeType;
  tags: string[];
  detectionTime: Date;
}

export interface AttackRoleGroup {
  role: string;
  data: AttackStep[];
}

// -------------------- Core Function --------------------

export async function fetchAttackGraphConfiguration(
  graphId: string,
  log: boolean = false
): Promise<GraphFlattenBlock[]> {
  const useDummyData = true;

  const dummyRaw: AttackRoleGroup[] = [
    {
      role: "Office-Employee",
      data: [
        {
          attack_id: "76c8f978-cc38-4281-8236-ecb7fae8f99c",
          index: "1",
          attack_name: "Discover AD Server",
          next_step: ["7f843cac-c92b-4704-9972-bd47726c53ea"],
          findings: {},
          requirements: {},
          technique_id: "T1018",
          technique_name: "Remote System Discovery",
          sub_index: "",
          sub_group: "",
          link_ids: ["6ef76ceb-b647-4ff0-9ea6-184ede2eeb01"],
          hosts: {
            hoomkk: [true],
          },
          result: {
            passed: 1,
            failed: 0,
          },
        },
        {
          attack_id: "7f843cac-c92b-4704-9972-bd47726c53ea",
          index: "2",
          attack_name: "Create SMB session to AD Server (2)",
          next_step: ["f05e54049cfa10bc4018bf9e68676cpp"],
          findings: {},
          requirements: {},
          technique_id: "T1021",
          technique_name: "Remote Services: SMB/Windows Admin Shares",
          sub_index: "",
          sub_group: "",
          link_ids: ["74174fbe-bd36-4cb5-9316-74540be5c6bc"],
          hosts: {
            hoomkk: [true],
          },
          result: {
            passed: 1,
            failed: 0,
          },
        },
        {
          attack_id: "f05e54049cfa10bc4018bf9e68676cpp",
          index: "3",
          attack_name: "Transfer RAT Agent_1",
          next_step: ["0c752dce-9302-4465-805f-522650aecepp"],
          findings: {},
          requirements: {},
          technique_id: "T1021",
          technique_name: "Remote Services: SMB/Windows Admin Shares",
          sub_index: "",
          sub_group: "",
          link_ids: ["d17d5db9-054d-48b5-9d7c-b4a67dc9640f"],
          hosts: {
            hoomkk: [true],
          },
          result: {
            passed: 1,
            failed: 0,
          },
        },
        {
          attack_id: "0c752dce-9302-4465-805f-522650aecepp",
          index: "4",
          attack_name: "Execute RAT Agent_1",
          next_step: ["beb369da-ca3e-4748-af50-c2484e4a1817"],
          findings: {},
          requirements: {},
          technique_id: "T1569",
          technique_name: "System Services: Service Execution",
          sub_index: "",
          sub_group: "",
          link_ids: ["e0fce31a-4a2f-4eb8-b8af-036b15145aba"],
          hosts: {
            hoomkk: [true],
          },
          result: {
            passed: 1,
            failed: 0,
          },
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
          findings: {
            "host.ip.address": ["192.168.5.98"],
          },
          requirements: {},
          technique_id: "T1087",
          technique_name: "Account Discovery: Domain Account",
          sub_index: "",
          sub_group: "",
          link_ids: ["0f820c0f-d6fb-43a5-ac36-9bb30f42c15e"],
          hosts: {
            xjlxxi: [true],
          },
          result: {
            passed: 1,
            failed: 0,
          },
        },
        {
          attack_id: "d7b6968d-04c0-4d0e-9d43-626a2ba6e34f",
          index: "6",
          attack_name: "Create SMB session to C-ITS Operator",
          next_step: ["f05e54049cfa10bc4018bf9e68676cc1"],
          findings: {},
          requirements: {},
          technique_id: "T1021",
          technique_name: "Remote Services: SMB/Windows Admin Shares",
          sub_index: "",
          sub_group: "",
          link_ids: ["cb70ac78-829e-4553-b595-f9c34fa04505"],
          hosts: {
            xjlxxi: [true],
          },
          result: {
            passed: 1,
            failed: 0,
          },
        },
        {
          attack_id: "f05e54049cfa10bc4018bf9e68676cc1",
          index: "7",
          attack_name: "Transfer RAT Agent_2",
          next_step: ["0c752dce-9302-4465-805f-522650aece31"],
          findings: {},
          requirements: {},
          technique_id: "T1021",
          technique_name: "Remote Services: SMB/Windows Admin Shares",
          sub_index: "",
          sub_group: "",
          link_ids: ["2631bd9f-78c2-48f6-8c2a-fcd8f74520a0"],
          hosts: {
            xjlxxi: [true],
          },
          result: {
            passed: 1,
            failed: 0,
          },
        },
        {
          attack_id: "0c752dce-9302-4465-805f-522650aece31",
          index: "8",
          attack_name: "Execute RAT Agent_2",
          next_step: ["473e5707-5786-4f53-934f-22175c1059b0"],
          findings: {},
          requirements: {},
          technique_id: "T1569",
          technique_name: "System Services: Service Execution",
          sub_index: "",
          sub_group: "",
          link_ids: ["840e0943-8df7-4c1d-829e-026ffd9940c0"],
          hosts: {
            xjlxxi: [true],
          },
          result: {
            passed: 1,
            failed: 0,
          },
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
          findings: {
            "host.file.path": [
              "/C C:\\Windows\\system32\\smrs.exe",
              "C:\\Windows\\system32\\smrs.exe",
              "C:\\users\\public\\MGsCOxPSNK.txt",
            ],
          },
          requirements: {},
          technique_id: "T1003",
          technique_name: "OS Credential Dumping: LSASS Memory",
          sub_index: "",
          sub_group: "",
          link_ids: ["eabad5d7-6089-4fa7-8d8e-5d64912ed75f"],
          hosts: {
            qsvgec: [true],
          },
          result: {
            passed: 1,
            failed: 0,
          },
        },
        {
          attack_id: "31e07036-7e57-4405-854e-827b9ef8b434",
          index: "10",
          attack_name: "Read Dumped Credentials",
          next_step: ["2984aab9-8726-421b-a090-6d75bc54c75a"],
          findings: {},
          requirements: {},
          technique_id: "T1003",
          technique_name: "OS Credential Dumping: LSASS Memory",
          sub_index: "",
          sub_group: "",
          link_ids: ["14d8646e-8d30-4b4f-bf6e-9f91c1932831"],
          hosts: {
            qsvgec: [true],
          },
          result: {
            passed: 1,
            failed: 0,
          },
        },
        {
          attack_id: "2984aab9-8726-421b-a090-6d75bc54c75a",
          index: "11",
          attack_name: "Brute-Force Dumped Credentials",
          next_step: ["de4837ba-b773-4392-a0b7-04656403b95f"],
          findings: {},
          requirements: {},
          technique_id: "T1110",
          technique_name: "Brute Force",
          sub_index: "",
          sub_group: "",
          link_ids: ["8fc02adb-ade1-41cb-b559-5118a3372361"],
          hosts: {
            qsvgec: [false],
          },
          result: {
            passed: 0,
            failed: 1,
          },
        },
        {
          attack_id: "de4837ba-b773-4392-a0b7-04656403b95f",
          index: "12",
          attack_name: "Discover RSU-Manage-Server",
          next_step: ["4bb8dc1e-d5e7-4114-920c-d8d462f19b7a"],
          findings: {
            "host.ip.address": ["10.10.0.99"],
          },
          requirements: {},
          technique_id: "T1018",
          technique_name: "Remote System Discovery",
          sub_index: "",
          sub_group: "",
          link_ids: ["b4447630-bc9d-4d55-9737-9ebaa43211c6"],
          hosts: {
            qsvgec: [true],
          },
          result: {
            passed: 1,
            failed: 0,
          },
        },
        {
          attack_id: "4bb8dc1e-d5e7-4114-920c-d8d462f19b7a",
          index: "13",
          attack_name: "Lateral Movement to RSU-Manage-Server",
          next_step: [""],
          findings: {
            "host.file.path": [
              "//10.140.20.34:8888/file/download';",
              "//10.140.20.34:8888",
              "C:\\Users\\Public\\string.exe",
            ],
            "host.ip.address": ["10.140.20.34"],
          },
          requirements: {},
          technique_id: "T1569",
          technique_name: "System Services: Service Execution",
          sub_index: "",
          sub_group: "",
          link_ids: ["8eecae76-24b4-4cd7-82a9-95110128b43f"],
          hosts: {
            qsvgec: [true],
          },
          result: {
            passed: 1,
            failed: 0,
          },
        },
      ],
    },
  ];

  const path = `/restapi/graph/configuration/${graphId}`;
  const headers: Record<string, string> = { Key: "ADMIN123" };

  const response = useDummyData
    ? dummyRaw
    : await proxyFetch({
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

  const result: AttackRoleGroup[] = response as AttackRoleGroup[];

  return result.flatMap((group) =>
    group.data.map((step, index) => ({
      ...step,
      technique: step.attack_name,
      target: group.role,
      status: step.result.passed > 0 ? "Complete" : "Failed",
      outcome: ["None", "Logged", "Logged", "Alert"][index % 4] as OutcomeType,
      tags: ["Engineering"],
      detectionTime: new Date(),
    }))
  );
}
