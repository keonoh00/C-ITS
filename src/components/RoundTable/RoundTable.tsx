"use client";

import React from "react";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Table, TableColumn } from "../Table/Table";

export interface RoundItem {
  assessmentName: string;
  defense: string;
  outcomeSuccess: number;
  outcomeFail: number;
  tag: string;
  link: string;
}

const data: RoundItem[] = [
  {
    assessmentName: "Penetration to C-ITS Center (Q1)",
    defense: "Incident Responder, MNX Hunter",
    outcomeSuccess: 100,
    outcomeFail: 0,
    tag: "Quarterly Testing",
    link: "/properties",
  },
  {
    assessmentName: "Penetration to C-ITS Center (Q2)",
    defense: "Incident Responder, MNX Hunter, ETC",
    outcomeSuccess: 44,
    outcomeFail: 56,
    tag: "Quarterly Testing",
    link: "/properties",
  },
  {
    assessmentName: "Penetration to C-ITS Center (Q3)",
    defense: "Incident Responder, MNX Hunter, Elastic Hunter",
    outcomeSuccess: 72,
    outcomeFail: 28,
    tag: "Quarterly Testing",
    link: "/properties",
  },
  {
    assessmentName: "Penetration to C-ITS Center (Q4)",
    defense: "MNX Hunter",
    outcomeSuccess: 0,
    outcomeFail: 100,
    tag: "Quarterly Testing",
    link: "/properties",
  },
];

const columns: TableColumn<RoundItem>[] = [
  {
    label: "Assessment Name",
    render: (item: RoundItem) => (
      <Link
        href={item.link}
        className="underline text-blue-400 hover:text-blue-300"
      >
        {item.assessmentName}
      </Link>
    ),
  },
  {
    label: "Defense",
    render: (item: RoundItem) => <div>{item.defense}</div>,
  },
  {
    label: "Outcome",
    render: (item: RoundItem) => (
      <div className="flex items-center justify-center gap-1">
        <div className="w-24 h-4 bg-base-700 rounded overflow-hidden flex">
          <div
            className={
              item.outcomeSuccess > 0 ? "bg-blue-400" : "bg-neutral-500"
            }
            style={{ width: `${item.outcomeSuccess}%` }}
          />
          {item.outcomeFail > 0 && (
            <div
              className="bg-blue-600"
              style={{ width: `${item.outcomeFail}%` }}
            />
          )}
        </div>
        <span className="text-xs text-neutral-400">{item.outcomeSuccess}%</span>
      </div>
    ),
  },
  {
    label: "Tags",
    render: (item: RoundItem) => (
      <span className="px-2 py-1 bg-primary-400 text-white text-xs rounded-full">
        {item.tag}
      </span>
    ),
  },
  {
    label: "Evaluate",
    render: () => (
      <Link href={"/evaluate"} className="flex items-center justify-center">
        <ArrowUpRight size={20} className="text-neutral-400" />
      </Link>
    ),
  },
];

export default function RoundTable() {
  return (
    <div className="flex-3 bg-base-700 rounded p-4">
      <Table data={data} columns={columns} />
    </div>
  );
}
