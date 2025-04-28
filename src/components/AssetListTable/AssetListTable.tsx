import React from "react";
import { Table, TableColumn } from "@/components/Table/Table";
import { Agent } from "@/api/defend/assets";

const assetColumns: TableColumn<Agent>[] = [
  {
    label: "Group",
    render: (item) => item.group,
  },
  {
    label: "Hostname",
    render: (item) => (
      <a href="#" className="text-blue-400 underline">
        {item.display_name}
      </a>
    ),
  },
  {
    label: "Platform",
    render: (item) => item.platform,
  },
  {
    label: "Contact",
    render: (item) => item.contact,
  },
  {
    label: "IP Address",
    render: (item) =>
      item.host_ip_addrs.map((ip, index) => <p key={index}>{ip}</p>),
  },
  {
    label: "Privileges",
    render: (item) => item.privilege,
  },
  {
    label: "Last Seen",
    render: (item) => (
      <>{new Date(item.last_seen).toISOString().replace("T", " ")}</>
    ),
  },
  {
    label: "Status",
    render: (item) => (
      <span
        className={`px-2 py-1 rounded-full text-xs ${
          item.deadman_enabled
            ? "bg-green-500 text-white"
            : "bg-red-500 text-white"
        }`}
      >
        {item.deadman_enabled ? "Alive" : "Disconnected"}
      </span>
    ),
  },
];

interface AssetListTableProps {
  data: Agent[];
}

const AssetListTable: React.FC<AssetListTableProps> = ({ data }) => {
  return (
    <div className="p-6">
      <Table data={data} columns={assetColumns} />
    </div>
  );
};

export default AssetListTable;
