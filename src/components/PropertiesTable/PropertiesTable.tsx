"use client";

import React, { useState } from "react";
import { Table, TableColumn } from "@/components/Table/Table";
import { ArrowUpRight } from "lucide-react";
import { InfoModal, InfoModalData, InfoModalOutcomeEnum } from "./InfoModal";

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

const SAMPLE_MODAL_DATA: InfoModalData = {
  defenses: "Detect Carbank APT",
  description: "Detection to Scan Port",
  detectionTime: new Date(),
  tags: ["Content Dev", "Engineering"],
  outcome: [
    "Blocked" as InfoModalOutcomeEnum,
    "Logged" as InfoModalOutcomeEnum,
  ],
};

export default function PropertiesTechniqueTable() {
  const [infoModalData, setInfoModalData] = useState<InfoModalData | null>(
    null
  );

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const data: PropertiesTechniqueItem[] = [
    {
      technique: "Find Unauthorized Process",
      target: "Employee",
      status: "Complete",
      outcome: "Quarterly Testing",
      tag: "Content Dev",
      onClick: () => {
        setInfoModalData(SAMPLE_MODAL_DATA);
        setIsOpen(true);
      },
    },
    {
      technique: "Find atypical open ports",
      target: "Employee",
      status: "Complete",
      outcome: "Not Alerted",
      tag: "Engineering",
      onClick: () => {
        setInfoModalData(SAMPLE_MODAL_DATA);
        setIsOpen(true);
      },
    },
    {
      technique: "Hunt for known suspicious files",
      target: "AD Server",
      status: "In progress",
      outcome: "None",
      tag: "Engineering",
      onClick: () => {
        setInfoModalData(SAMPLE_MODAL_DATA);
        setIsOpen(true);
      },
    },
  ];
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
