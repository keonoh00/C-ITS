"use client";

import { Table, TableColumn } from "@/components/Table/Table";
import Image from "next/image";

interface ScenarioItem {
  id: number;
  name: string;
  type: string;
  ttp: string;
  plugin: string;
  requires: boolean;
  unlock: boolean;
}

const scenarioData: ScenarioItem[] = [
  {
    id: 1,
    name: "Find Unauthorized Process",
    type: "Detection",
    ttp: "-",
    plugin: "Elastic, Shell",
    requires: true,
    unlock: true,
  },
  {
    id: 2,
    name: "Find Unauthorized Process",
    type: "Detection",
    ttp: "-",
    plugin: "Elastic, Shell",
    requires: false,
    unlock: true,
  },
  {
    id: 3,
    name: "Acquire suspicious files",
    type: "Detection",
    ttp: "-",
    plugin: "Elastic, Shell",
    requires: true,
    unlock: false,
  },
  {
    id: 4,
    name: "Enable In/Out bound TCP/UDP firewall rule",
    type: "Response",
    ttp: "Uncommonly Used Port",
    plugin: "MNX, Shell",
    requires: false,
    unlock: true,
  },
];

export function ScenarioTable() {
  const columns: TableColumn<ScenarioItem>[] = [
    {
      label: "Order",
      render: (_item, index) => index + 1,
    },
    {
      label: "Name",
      render: (item) => item.name,
    },
    {
      label: "Defend Type",
      render: (item) => item.type,
    },
    {
      label: "TTP",
      render: (item) => item.ttp,
    },
    {
      label: "Plug-In",
      render: (item) => item.plugin,
    },
    {
      label: "Pre-Con Requires",
      render: (item) =>
        item.requires ? (
          <button className="bg-black w-[24px] h-[24px] rounded relative">
            <Image
              src={"/assets/lock.svg"}
              alt="lock"
              className="p-[4px]"
              fill
            />
          </button>
        ) : null,
    },
    {
      label: "Unlock",
      render: (item) =>
        item.unlock ? (
          <button className="bg-black w-[24px] h-[24px] rounded relative">
            <Image
              src={"/assets/unlock.svg"}
              fill
              alt="unlock"
              className="p-[4px]"
            />
          </button>
        ) : null,
    },
    {
      label: "-",
      render: () => "x",
    },
  ];

  return <Table data={scenarioData} columns={columns} />;
}
