"use client";

import React, { useState } from "react";
import { Tag } from "../Tag/Tag";

interface FieldItem {
  title: string;
  count: number;
  children?: FieldItem[];
}

const fieldsData: FieldItem[] = [
  {
    title: "Campaigns",
    count: 250,
  },
  {
    title: "Passed",
    count: 250,
    children: [
      { title: "Blocked", count: 14 },
      { title: "N/A", count: 14 },
      { title: "Alerted", count: 204 },
    ],
  },
  {
    title: "Failed",
    count: 170,
    children: [
      { title: "Blocked", count: 14 },
      { title: "N/A", count: 14 },
      { title: "Alerted", count: 204 },
    ],
  },
  {
    title: "To Be Determined",
    count: 44,
    children: [
      { title: "Blocked", count: 14 },
      { title: "N/A", count: 14 },
      { title: "Alerted", count: 204 },
    ],
  },
];

export default function FieldTree() {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const toggleExpand = (title: string) => {
    setExpanded((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  return (
    <div className="flex flex-col gap-2">
      {fieldsData.map((field, idx) => (
        <div key={idx}>
          <div
            onClick={() => field.children && toggleExpand(field.title)}
            className="flex items-center justify-between cursor-pointer bg-base-800 border-b border-base-700 px-3 py-2 hover:bg-base-700 rounded-md"
          >
            <div className="flex items-center gap-2">
              {field.children && (
                <span className="text-neutral-400">
                  {expanded[field.title] ? "▾" : "▸"}
                </span>
              )}
              <span className="text-sm text-white">{field.title}</span>
            </div>
            <span className="text-sm text-white font-bold">{field.count}</span>
          </div>

          {/* Expand Children */}
          {field.children && expanded[field.title] && (
            <div className="pl-8 flex flex-col gap-1 mt-2">
              {field.children.map((child, cIdx) => (
                <div
                  key={cIdx}
                  className="flex items-center justify-between text-sm text-neutral-300"
                >
                  <div className="flex items-center gap-2">
                    <Tag
                      label={child.title}
                      color={
                        child.title === "Blocked"
                          ? "blue"
                          : child.title === "N/A"
                          ? "black"
                          : child.title === "Alerted"
                          ? "green"
                          : "gray"
                      }
                    />
                  </div>
                  <span className="font-semibold">{child.count}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
