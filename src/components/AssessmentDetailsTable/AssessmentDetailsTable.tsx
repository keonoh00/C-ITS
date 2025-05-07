"use client";

import clsx from "clsx";
import { Table, TableColumn } from "@/components/common/Table/Table";
import { ExternalLink } from "lucide-react";
import { useState } from "react";
import AssessmentDetailsResultModal from "./AssessmentDetailsResultModal";

type ExecutionStatus = "success" | "fail";

export interface LogEntry {
  timestamp: string;
  status: ExecutionStatus;
  defend: string;
  agent: string;
  host: string;
  pid: number;
}

const logs: LogEntry[] = [
  {
    timestamp: "8/12/2024, 04:02:06 PM GMT+9",
    status: "success",
    defend: "Hunt for known suspicious files",
    agent: "Employee PC",
    host: "Desktop-KER6",
    pid: 204,
  },
  {
    timestamp: "8/12/2024, 04:02:06 PM GMT+9",
    status: "fail",
    defend: "Search for Powershell Execution Policy Bypass",
    agent: "Employee PC",
    host: "Desktop-KER6",
    pid: 4789,
  },
];

interface StatusDotProps {
  status: ExecutionStatus;
  label: string;
}

export const StatusDot: React.FC<StatusDotProps> = ({ status, label }) => {
  return (
    <div className="relative flex justify-center items-center h-14">
      {/* vertical line */}
      <div className="absolute -top-3 -bottom-3 w-[2px] bg-neutral-500 z-0" />
      {/* status circle */}
      <div
        className={clsx(
          "w-8 h-8 rounded-full border-2 flex items-center justify-center text-[10px] font-[1000] text-white z-10",
          status === "success" ? "border-green-500" : "border-red-500"
        )}
        style={{ backgroundColor: "#2E3641" }}
      >
        {label}
      </div>
    </div>
  );
};

export default function AssessmentDetailsTable() {
  const [open, setOpen] = useState<boolean>(false);
  const [selectedLog, setSelectedLog] = useState<LogEntry | null>(null);

  const columns: TableColumn<LogEntry>[] = [
    { label: "Timestamp", render: (log) => log.timestamp },
    {
      label: "Status",
      render: (log) => (
        <StatusDot
          status={log.status}
          label={log.status == "success" ? "Success" : "Fail"}
        />
      ),
    },
    { label: "Defend", render: (log) => log.defend },
    { label: "Agent", render: (log) => log.agent },
    { label: "Host", render: (log) => log.host },
    { label: "pid", render: (log) => log.pid },
    {
      label: "Result",
      render: (log) => (
        <button
          onClick={() => {
            setSelectedLog(log);
            setOpen(true);
          }}
          className="p-2 bg-base-700 rounded hover:bg-base-600"
        >
          <ExternalLink size={16} />
        </button>
      ),
    },
  ];

  return (
    <div className="w-full bg-base-800 rounded-lg">
      <Table data={logs} columns={columns} />
      {selectedLog && (
        <AssessmentDetailsResultModal
          open={open}
          onClose={() => setOpen(false)}
          log={selectedLog}
        />
      )}
    </div>
  );
}
