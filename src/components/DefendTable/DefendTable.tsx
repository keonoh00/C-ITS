"use client";

import { useState } from "react";
import { Table, TableColumn } from "@/components/Table/Table";
import AbilityModal from "@/components/AbilityModal/AbilityModal";

export enum DefendPlatform {
  WINDOWS = "Windows",
}

export enum DefendTactics {
  DETECTION = "Detection",
}

export enum DefendPlugin {
  ELASTIC = "Elastic",
  SHELL = "Shell",
}

export type DefendMethods = {
  id: string;
  name: string;
  platform: DefendPlatform;
  plugin: DefendPlugin[];
  tactics: DefendTactics;
  technique: boolean;
  lastUpdated: Date;
};

const MOCK_DATA: DefendMethods[] = [
  {
    id: "1",
    name: "Find Unauthorized Process",
    platform: DefendPlatform.WINDOWS,
    plugin: [DefendPlugin.ELASTIC, DefendPlugin.SHELL],
    tactics: DefendTactics.DETECTION,
    technique: false,
    lastUpdated: new Date("2023-07-04T00:00:00.000Z"),
  },
  {
    id: "2",
    name: "Hunt for known suspicious files",
    platform: DefendPlatform.WINDOWS,
    plugin: [DefendPlugin.ELASTIC, DefendPlugin.SHELL],
    tactics: DefendTactics.DETECTION,
    technique: true,
    lastUpdated: new Date("2023-07-04T00:00:00.000Z"),
  },
  {
    id: "3",
    name: "Detect fileless malware execution",
    platform: DefendPlatform.WINDOWS,
    plugin: [DefendPlugin.SHELL],
    tactics: DefendTactics.DETECTION,
    technique: true,
    lastUpdated: new Date("2023-07-04T00:00:00.000Z"),
  },
  {
    id: "4",
    name: "Command-and-Control DNS blocking",
    platform: DefendPlatform.WINDOWS,
    plugin: [DefendPlugin.ELASTIC],
    tactics: DefendTactics.DETECTION,
    technique: false,
    lastUpdated: new Date("2023-07-04T00:00:00.000Z"),
  },
];

interface DefendTableProps {
  data?: DefendMethods[];
}

export function DefendTable({ data = MOCK_DATA }: DefendTableProps) {
  const [open, setOpen] = useState(false);

  const columns: TableColumn<DefendMethods>[] = [
    {
      label: "선택",
      className: "w-[5%] py-2 px-4 text-white text-lg font-bold",
      render: () => <input type="checkbox" />,
    },
    {
      label: "Name",
      render: (item) => (
        <span
          className="underline cursor-pointer hover:text-blue-400 transition-colors text-left link"
          onClick={() => setOpen(true)}
        >
          {item.name}
        </span>
      ),
    },
    {
      label: "Platform",
      render: (item) => item.platform,
    },
    {
      label: "Plug In",
      render: (item) => item.plugin.join(", "),
    },
    {
      label: "ATT&CK Tactics",
      render: (item) => item.tactics,
    },
    {
      label: "Technique",
      render: (item) => (item.technique ? "O" : "X"),
    },
    {
      label: "Last Updated",
      render: (item) => item.lastUpdated.toISOString().split("T")[0],
    },
  ];

  return (
    <>
      <Table data={data} columns={columns} striped />
      <AbilityModal
        open={open}
        onClose={() => setOpen(false)}
        onSave={() => console.log("Save")}
      />
    </>
  );
}
