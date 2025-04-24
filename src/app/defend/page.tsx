"use client";

import {
  DefendMethods,
  DefendPlatform,
  DefendPlugin,
  DefendTable,
  DefendTactics,
} from "@/components/DefendTable/DefendTable";
import { ColumnDef } from "@tanstack/react-table";
import { SaveIcon, Search, Trash2 } from "lucide-react";

const DATA: DefendMethods[] = [
  {
    id: "1",
    name: "Find Unauthorized Process",
    platform: "Windows" as DefendPlatform,
    plugin: ["Elastic", "Shell"] as DefendPlugin[],
    tactics: "Detection" as DefendTactics,
    technique: false,
    lastUpdated: new Date("2023-07-04T00:00:00.000Z"),
  },
  {
    id: "2",
    name: "Hunt for known suspicious files",
    platform: "Windows" as DefendPlatform,
    plugin: ["Elastic", "Shell"] as DefendPlugin[],
    tactics: "Detection" as DefendTactics,
    technique: false,
    lastUpdated: new Date("2023-07-04T00:00:00.000Z"),
  },
  {
    id: "3",
    name: "Find Unauthorized Process",
    platform: "Windows" as DefendPlatform,
    plugin: ["Elastic", "Shell"] as DefendPlugin[],
    tactics: "Detection" as DefendTactics,
    technique: false,
    lastUpdated: new Date("2023-07-04T00:00:00.000Z"),
  },
  {
    id: "4",
    name: "Hunt for known suspicious files",
    platform: "Windows" as DefendPlatform,
    plugin: ["Elastic", "Shell"] as DefendPlugin[],
    tactics: "Detection" as DefendTactics,
    technique: false,
    lastUpdated: new Date("2023-07-04T00:00:00.000Z"),
  },
];

export const columns: ColumnDef<DefendMethods>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "platform",
    header: "Platform",
  },
  {
    accessorKey: "plugin",
    header: "Plug In",
  },
  {
    accessorKey: "tactics",
    header: "ATT&CK Tactics",
  },
  {
    accessorKey: "technique",
    header: "Technique",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
];

export default function Home() {
  const onSearchClick = () => {
    console.log("asdfasdfas");
  };
  return (
    <div className="flex flex-col w-full bg-base-900 p-8 rounded-xl">
      <div className="justify-between flex w-full items-center">
        <div className="flex items-center">
          <input
            placeholder="Search..."
            className="p-2 w-120 border border-neutral-500 text-neutral-300 rounded-sm"
            onSubmit={onSearchClick}
          />
          <button className="ml-2 p-2" onClick={onSearchClick}>
            <Search size={18} className="text-neutral-400" />
          </button>
        </div>
        <div className="flex-row flex">
          <button className="p-2 bg-primary-300 flex flex-row rounded-sm">
            <SaveIcon color="white" />
            <p className="ml-1">등록</p>
          </button>
          <button className="p-2 bg-danger-500 flex flex-row rounded-sm ml-2">
            <Trash2 color="white" />
            <p className="ml-1">삭제</p>
          </button>
        </div>
      </div>

      <div className="mt-4">
        <DefendTable data={DATA} />
      </div>
    </div>
  );
}
