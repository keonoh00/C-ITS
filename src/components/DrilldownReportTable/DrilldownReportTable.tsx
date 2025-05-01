"use client";

import React, { useState } from "react";
import { Table, TableColumn } from "@/components/Table/Table"; // Assuming you placed it like this
import SearchInput from "../SearchInput/SearchInput";

interface DrillDownItem {
  testCase: string;
  techniqueId: string;
  technique: string;
  phase: string;
  outcome: string;
  tags: string[];
}

const data: DrillDownItem[] = [
  {
    testCase: "Data compression via 7zip",
    techniqueId: "T1560.001",
    technique: "Archive via Utility",
    phase: "Collection",
    outcome: "none",
    tags: ["Engineering"],
  },
  {
    testCase: "Exfiltration over FTP",
    techniqueId: "T1048.003",
    technique: "Archive via Utility",
    phase: "Exfiltration",
    outcome: "none",
    tags: ["Engineering"],
  },
  {
    testCase: "Macro – Remote Template",
    techniqueId: "T1221",
    technique: "Archive via Utility",
    phase: "Defense Evasion",
    outcome: "none",
    tags: ["Engineering"],
  },
  {
    testCase: "Execution using PowerShell command",
    techniqueId: "T1059.001",
    technique: "Archive via Utility",
    phase: "Defense Evasion",
    outcome: "none",
    tags: ["Engineering"],
  },
  {
    testCase: "VBScript execution using Rundll32",
    techniqueId: "T1059.001",
    technique: "Archive via Utility",
    phase: "Defense Evasion",
    outcome: "Not Alerted",
    tags: ["Engineering"],
  },
];

export default function DrillDownTable() {
  const [search, setSearch] = useState("");

  const filteredData = data.filter((item) =>
    item.testCase.toLowerCase().includes(search.toLowerCase())
  );

  const columns: TableColumn<DrillDownItem>[] = [
    {
      label: "Test case",
      render: (item) => item.testCase,
    },
    {
      label: "Technique ID",
      render: (item) => <span className="font-bold">{item.techniqueId}</span>,
    },
    {
      label: "Technique",
      render: (item) => item.technique,
    },
    {
      label: "Phase",
      render: (item) => item.phase,
    },
    {
      label: "Outcome",
      render: (item) => (
        <span
          className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
            item.outcome === "Not Alerted"
              ? "bg-green-600 text-white"
              : "bg-red-500 text-white"
          }`}
        >
          {item.outcome}
        </span>
      ),
    },
    {
      label: "Tags",
      render: (item) => (
        <div>
          {item.tags.map((tag, idx) => (
            <span
              key={idx}
              className="bg-blue-500 text-white text-xs rounded-full px-2 py-0.5"
            >
              {tag}
            </span>
          ))}
        </div>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <SearchInput onSearch={setSearch} />

      <Table<DrillDownItem> data={filteredData} columns={columns} />
    </div>
  );
}
