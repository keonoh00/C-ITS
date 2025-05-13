"use client";

import clsx from "clsx";
import { Table, TableColumn } from "@/components/common/Table/Table";
import { ExternalLink } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import AssessmentDetailsResultModal from "./AssessmentDetailsResultModal";
import { OperationItem } from "@/api/defend/assetssment";
import { WebSocketMessageMap, ws } from "@/lib/WebSocketService";

type ExecutionStatus = "success" | "fail";

interface LogEntry {
  timestamp: string;
  status: "success" | "fail";
  defend: string;
  agent: string;
  host: string;
  pid: string;
  result: string;
}

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

interface Props {
  operation: OperationItem;
}

export default function AssessmentDetailsTable({ operation }: Props) {
  const [open, setOpen] = useState(false);
  const [selectedLog, setSelectedLog] = useState<LogEntry | null>(null);
  const [visibleLogs, setVisibleLogs] = useState<LogEntry[]>([]);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const logs: LogEntry[] = useMemo(() => {
    return operation.chain.map((link) => {
      const agent = operation.host_group.find((a) => a.paw === link.paw);
      return {
        timestamp: link.collect || link.finish || "-",
        status: link.status === 0 ? "success" : "fail",
        defend: link.ability?.name ?? "Unknown Ability",
        agent: agent?.display_name ?? link.paw,
        host: agent?.host ?? "unknown",
        pid: link.pid ?? "-",
        result: link.output ?? "No output",
      };
    });
  }, [operation]);

  const columns: TableColumn<LogEntry>[] = [
    { label: "Timestamp", render: (log) => log.timestamp },
    {
      label: "Status",
      render: (log) => (
        <StatusDot
          status={log.status}
          label={log.status === "success" ? "Success" : "Fail"}
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

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [visibleLogs]);

  useEffect(() => {
    const startUpdate = (data: WebSocketMessageMap["trigger"]) => {
      setVisibleLogs([]);
      let timer: NodeJS.Timeout;

      const pushNext = () => {
        setVisibleLogs((prev) => {
          if (logs.length > prev.length) {
            const newItem = { ...logs[prev.length], ...data };
            console.log(data);
            timer = setTimeout(pushNext, getRandomDelay());
            return [...prev, newItem];
          }
          return prev;
        });
      };

      // start first
      timer = setTimeout(pushNext, getRandomDelay());

      return () => clearTimeout(timer);
    };

    const getRandomDelay = () => Math.floor(Math.random() * 2000) + 5000; // 5000–7000 ms

    ws.on("trigger", startUpdate);
    return () => ws.off("trigger", startUpdate);
  }, [logs]);

  return (
    <div className="w-full bg-base-800 rounded-lg max-h-[500px] overflow-y-auto">
      <Table data={visibleLogs} columns={columns} />
      <div ref={bottomRef} />
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
