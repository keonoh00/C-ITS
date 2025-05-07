"use client";

import React, { useEffect, useState } from "react";
import { Table, TableColumn } from "@/components/common/Table/Table";
import { ArrowUpRight } from "lucide-react";
import { InfoModal, InfoModalData, InfoModalOutcomeEnum } from "./InfoModal";
import {
  AttackRoleGroup,
  fetchAttackGraphConfiguration,
} from "@/api/defend/graph";
import { Pagination } from "../common/Pagination/Pagination";
import { Tag } from "../common/Tag/Tag";

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
          item.outcome === "Quarterly Testing"
            ? "blue"
            : item.outcome === "Not Alerted"
            ? "yellow"
            : "red"
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
      const graph: AttackRoleGroup[] = await fetchAttackGraphConfiguration(
        "f82082d7-0cb7-41ec-a767-7d5c918a2310"
      );

      const parsed: PropertiesTechniqueItem[] = graph.flatMap((roleBlock) =>
        roleBlock.data.map((attack) => ({
          technique: attack.attack_name,
          target: roleBlock.role,
          status:
            attack.requirements && Object.keys(attack.requirements).length > 0
              ? "In progress"
              : "Complete",
          outcome:
            attack.requirements && Object.keys(attack.requirements).length > 0
              ? "Not Alerted"
              : "Quarterly Testing",
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
