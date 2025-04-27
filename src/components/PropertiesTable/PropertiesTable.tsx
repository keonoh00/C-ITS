"use client";

import React from "react";
import { Table, TableColumn } from "@/components/Table/Table";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export interface PropertiesTechniqueItem {
  technique: string;
  target: string;
  status: "Complete" | "In progress";
  outcome: "Quarterly Testing" | "Not Alerted" | "None";
  tag: string;
  infoLink: string;
}

const data: PropertiesTechniqueItem[] = [
  {
    technique: "Find Unauthorized Process",
    target: "Employee",
    status: "Complete",
    outcome: "Quarterly Testing",
    tag: "Content Dev",
    infoLink: "/info/1",
  },
  {
    technique: "Find atypical open ports",
    target: "Employee",
    status: "Complete",
    outcome: "Not Alerted",
    tag: "Engineering",
    infoLink: "/info/2",
  },
  {
    technique: "Hunt for known suspicious files",
    target: "AD Server",
    status: "In progress",
    outcome: "None",
    tag: "Engineering",
    infoLink: "/info/3",
  },
];

const columns: TableColumn<PropertiesTechniqueItem>[] = [
  {
    label: "Technique",
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
      <span className="px-2 py-1 bg-base-700 text-neutral-300 text-xs rounded-full">
        {item.tag}
      </span>
    ),
  },
  {
    label: "Info",
    render: (item: PropertiesTechniqueItem) => (
      <Link href={item.infoLink} className="flex items-center justify-center">
        <ArrowUpRight size={20} className="text-neutral-400" />
      </Link>
    ),
  },
];

export default function PropertiesTechniqueTable() {
  return (
    <div>
      <Table data={data} columns={columns} />
    </div>
  );
}
