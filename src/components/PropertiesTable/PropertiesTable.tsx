"use client";

import React, { useEffect, useState } from "react";
import { Table, TableColumn } from "@/components/common/Table/Table";
import { ArrowUpRight } from "lucide-react";
import { InfoModal, InfoModalData, InfoModalOutcomeEnum } from "./InfoModal";
import { AttackRoleGroup } from "@/api/defend/graph";
import { Pagination } from "../common/Pagination/Pagination";
import { Tag } from "../common/Tag/Tag";

export interface PropertiesTechniqueItem {
  technique: string;
  target: string;
  status: "Complete" | "In progress";
  outcome: "Alert" | "Blocked" | "Logged" | "None";
  tag: string;
  onClick: () => void;
}

const DUMMY_DATA: AttackRoleGroup[] = [
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

const columns: TableColumn<PropertiesTechniqueItem>[] = [
  {
    label: "Technique",
    className: "py-5",
    render: (item) => <span>{item.technique}</span>,
  },
  {
    label: "Target",
    render: (item) => <span>{item.target}</span>,
  },
  {
    label: "Status",
    render: (item) => (
      <Tag
        label={item.status}
        color={item.status === "Complete" ? "green" : "gray"}
      />
    ),
  },
  {
    label: "Outcome",
    render: (item) => (
      <Tag
        label={item.outcome}
        color={
          item.outcome === "Alert"
            ? "green"
            : item.outcome === "Logged"
            ? "orange"
            : item.outcome === "Blocked"
            ? "blue"
            : item.outcome === "None"
            ? "red"
            : "gray"
        }
      />
    ),
  },
  {
    label: "Tags",
    render: (item) => <Tag label={item.tag} color={"gray"} />,
  },
  {
    label: "Info",
    render: (item) => (
      <button onClick={item.onClick}>
        <div className="flex p-3 bg-base-900 rounded hover:bg-neutral-500 cursor-pointer">
          <ArrowUpRight size={20} className="text-white" />
        </div>
      </button>
    ),
  },
];

export default function PropertiesTechniqueTable() {
  const [infoModalData, setInfoModalData] = useState<InfoModalData | null>(
    null
  );
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState<PropertiesTechniqueItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const pageSize = 4;
  const totalPages = Math.ceil(data.length / pageSize);
  const paginatedData = data.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    async function loadData() {
      // const graph: AttackRoleGroup[] = await fetchAttackGraphConfiguration(
      //   "f82082d7-0cb7-41ec-a767-7d5c918a2310"
      // );
      const graph: AttackRoleGroup[] = DUMMY_DATA;

      const parsed: PropertiesTechniqueItem[] = graph.flatMap((roleBlock) =>
        roleBlock.data.map((attack, index) => ({
          technique: attack.attack_name,
          target: roleBlock.role,
          status:
            attack.requirements && Object.keys(attack.requirements).length > 0
              ? "In progress"
              : "Complete",
          outcome: ["None", "Logged", "Logged", "Alert"][
            index % 4
          ] as PropertiesTechniqueItem["outcome"],
          tag: "Engineering",
          onClick: () => {
            setInfoModalData({
              defenses: "Detect Carbank APT",
              description: attack.attack_name,
              detectionTime: new Date(),
              tags: ["Content Dev", "Engineering"],
              outcome: [
                "Blocked" as InfoModalOutcomeEnum,
                "Logged" as InfoModalOutcomeEnum,
              ],
            });
            setIsOpen(true);
          },
        }))
      );

      setData(parsed);
    }

    loadData();
  }, []);

  return (
    <div>
      <Table data={paginatedData} columns={columns} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      {isOpen && infoModalData && (
        <InfoModal
          open={isOpen}
          onClose={() => setIsOpen(false)}
          onSave={() => console.log("saved")}
          modalData={infoModalData}
        />
      )}
    </div>
  );
}
