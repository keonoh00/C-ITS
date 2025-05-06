"use client";

import React, { useEffect, useState } from "react";
import { Table, TableColumn } from "@/components/Table/Table";
import { ArrowUpRight } from "lucide-react";
import { InfoModal, InfoModalData, InfoModalOutcomeEnum } from "./InfoModal";
import {
  AttackRoleGroup,
  fetchAttackGraphConfiguration,
} from "@/api/defend/graph";

export interface PropertiesTechniqueItem {
  technique: string;
  target: string;
  status: "Complete" | "In progress";
  outcome: "Quarterly Testing" | "Not Alerted" | "None";
  tag: string;
  onClick: () => void;
}

const columns: TableColumn<PropertiesTechniqueItem>[] = [
  {
    label: "Technique",
    className: "py-5",
    render: (item: PropertiesTechniqueItem) => <span>{item.technique}</span>,
  },
  {
    label: "Target",
    render: (item: PropertiesTechniqueItem) => <span>{item.target}</span>,
  },
  {
    label: "Status",
    render: (item: PropertiesTechniqueItem) => (
      <span
        className={
          item.status === "Complete"
            ? "px-2 py-1 bg-green-500 text-white text-xs rounded-full"
            : "px-2 py-1 bg-neutral-400 text-black text-xs rounded-full"
        }
      >
        {item.status}
      </span>
    ),
  },
  {
    label: "Outcome",
    render: (item: PropertiesTechniqueItem) => {
      const outcomeColor =
        item.outcome === "Quarterly Testing"
          ? "bg-blue-400"
          : item.outcome === "Not Alerted"
          ? "bg-yellow-400"
          : "bg-red-500";

      return (
        <span
          className={`px-2 py-1 ${outcomeColor} text-black text-xs rounded-full`}
        >
          {item.outcome}
        </span>
      );
    },
  },
  {
    label: "Tags",
    render: (item: PropertiesTechniqueItem) => (
      <span className="px-2 py-1 bg-neutral-500 text-white text-xs rounded-full">
        {item.tag}
      </span>
    ),
  },
  {
    label: "Info",
    render: (item: PropertiesTechniqueItem) => (
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
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [data, setData] = useState<PropertiesTechniqueItem[]>([]);

  useEffect(() => {
    async function loadData() {
      const graph: AttackRoleGroup[] = await fetchAttackGraphConfiguration(
        "f82082d7-0cb7-41ec-a767-7d5c918a2310"
      );

      console.log(graph);

      const parsed: PropertiesTechniqueItem[] = graph.flatMap((roleBlock) =>
        roleBlock.data.map((attack) => ({
          technique: attack.technique_name,
          target: roleBlock.role,
          status: (attack.requirements.length > 0
            ? "In progress"
            : "Complete") as "In progress" | "Complete",
          outcome: (attack.requirements.length > 0
            ? "Not Alerted"
            : "Quarterly Testing") as
            | "Not Alerted"
            | "Quarterly Testing"
            | "None",
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
      <Table data={data} columns={columns} />
      {isOpen && infoModalData ? (
        <InfoModal
          open={isOpen}
          onClose={() => setIsOpen(false)}
          onSave={() => console.log("saved")}
          modalData={infoModalData}
        />
      ) : null}
    </div>
  );
}
