"use client";

import clsx from "clsx";
import { Table, TableColumn } from "@/components/Table/Table";
import Link from "next/link";

interface AssessmentItem {
  name: string;
  scenario: string;
  assets: number;
  live: boolean;
  updated: string;
}

const assessments: AssessmentItem[] = [
  {
    name: "Detect Carbanak APT",
    scenario: "Response Unauthorized Process and Port",
    assets: 4,
    live: true,
    updated: "2024-08-12 18:15:23",
  },
  {
    name: "Detect APT 28",
    scenario: "Rule for C-ITS Center",
    assets: 4,
    live: false,
    updated: "2024-08-12 18:15:23",
  },
];

export default function AssessmentTable() {
  const columns: TableColumn<AssessmentItem>[] = [
    {
      label: "Assessment Name",
      render: (item) => (
        <Link
          href={"/assessment/123123"}
          className="underline cursor-pointer hover:text-blue-400 transition-colors"
        >
          {item.name}
        </Link>
      ),
    },
    {
      label: "Defend Scenario",
      render: (item) => item.scenario,
    },
    {
      label: "Assets",
      render: (item) => item.assets,
    },
    {
      label: "Live Status",
      render: (item) => (
        <span
          className={clsx(
            "px-2 py-1 rounded text-xs font-semibold",
            item.live ? "bg-green-500 text-white" : "bg-red-500 text-white"
          )}
        >
          {item.live ? "On" : "Off"}
        </span>
      ),
    },
    {
      label: "Last Activity",
      render: (item) => item.updated,
    },
  ];

  return (
    <div className="w-full bg-base-800 rounded-lg">
      <Table data={assessments} columns={columns} />
    </div>
  );
}
