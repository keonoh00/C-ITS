"use client";

import React, { useEffect, useState } from "react";
import { Table, TableColumn } from "@/components/Table/Table";
import { ArrowUpRight } from "lucide-react";
import { InfoModal, InfoModalData, InfoModalOutcomeEnum } from "./InfoModal";
import {
  AttackRoleGroup,
  fetchAttackGraphConfiguration,
} from "@/api/defend/graph";
import { Pagination } from "../Pagination/Pagination";

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
    render: (item) => <span>{item.technique}</span>,
  },
  {
    label: "Target",
    render: (item) => <span>{item.target}</span>,
  },
  {
    label: "Status",
    render: (item) => (
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
    render: (item) => {
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
    render: (item) => (
      <span className="px-2 py-1 bg-neutral-500 text-white text-xs rounded-full">
        {item.tag}
      </span>
    ),
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

  const paginatedData = data.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );
  const totalPages = Math.ceil(data.length / pageSize);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    async function loadData() {
      const graph: AttackRoleGroup[] = await fetchAttackGraphConfiguration(
        "f82082d7-0cb7-41ec-a767-7d5c918a2310"
      );

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
      <Table data={paginatedData} columns={columns} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
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
