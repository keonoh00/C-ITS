"use client";

import clsx from "clsx";
import { Table, TableColumn } from "@/components/Table/Table";
import Link from "next/link";
import { OperationItem, OperationResponse } from "@/api/defend/assetssment";

export interface AssessmentTableProps {
  data: OperationResponse;
}

export default function AssessmentTable({ data }: AssessmentTableProps) {
  const columns: TableColumn<OperationItem>[] = [
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
      render: (item) => item.adversary.name,
    },
    {
      label: "Assets",
      render: (item) => item.host_group.length,
    },
    {
      label: "Live Status",
      render: (item) => (
        <span
          className={clsx(
            "px-2 py-1 rounded text-xs font-semibold",
            item.state ? "bg-green-500 text-white" : "bg-red-500 text-white"
          )}
        >
          {item.state}
        </span>
      ),
    },
    {
      label: "Last Activity",
      render: (item) => item.start,
    },
  ];

  return (
    <div className="w-full bg-base-800 rounded-lg">
      <Table data={data} columns={columns} />
    </div>
  );
}
