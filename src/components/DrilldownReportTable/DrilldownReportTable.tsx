"use client";

import React, { useState } from "react";
import { Table, TableColumn } from "@/components/common/Table/Table"; // Assuming you placed it like this
import SearchInput from "../common/SearchInput/SearchInput";
import { TAG_COLOR_MAP, Tag } from "../common/Tag/Tag";
import { drillDownData, DrillDownItem } from "./data";
import { Pagination } from "../common/Pagination/Pagination";

const uniqueTactics = [...new Set(drillDownData.map((it) => it.tactic))].sort();
const uniqueOutcomes = [
  ...new Set(drillDownData.map((it) => it.outcome)),
].sort();

const TACTIC_COLOR_MAP: Record<string, string> = {};
const OUTCOME_COLOR_MAP: Record<string, string> = {};
const TAG_COLOR_KEYS = Object.keys(
  TAG_COLOR_MAP
) as (keyof typeof TAG_COLOR_MAP)[];

uniqueTactics.forEach((tactic, index) => {
  TACTIC_COLOR_MAP[tactic] = TAG_COLOR_KEYS[index % TAG_COLOR_KEYS.length];
});

uniqueOutcomes.forEach((outcome, index) => {
  OUTCOME_COLOR_MAP[outcome] = TAG_COLOR_KEYS[index % TAG_COLOR_KEYS.length];
});

export default function DrillDownTable() {
  const [query, setQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 10;
  const filteredData = drillDownData.filter((item) =>
    item.testCase.toLowerCase().includes(query.toLowerCase())
  );
  const totalPages = Math.ceil(filteredData.length / pageSize);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const columns: TableColumn<DrillDownItem>[] = [
    {
      label: "Test case",
      render: (item) => item.testCase,
    },
    {
      label: "Phase",
      render: (item) => item.phase,
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
      label: "Tactic",
      render: (item, index) => (
        <Tag
          label={item.tactic}
          key={index}
          color={TACTIC_COLOR_MAP[item.tactic] as keyof typeof TAG_COLOR_MAP}
        />
      ),
    },
    {
      label: "Outcome",
      render: (item, index) => (
        <Tag
          label={item.outcome}
          key={index}
          color={OUTCOME_COLOR_MAP[item.outcome] as keyof typeof TAG_COLOR_MAP}
        />
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="w-120">
        <SearchInput onSearch={setQuery} />
      </div>

      <Table<DrillDownItem> data={paginatedData} columns={columns} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
