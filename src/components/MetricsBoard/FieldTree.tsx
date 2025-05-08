"use client";

import React, { useState } from "react";
import { Tag } from "../common/Tag/Tag";

interface FieldItem {
  title: string;
  count: number;
  children?: FieldItem[];
}

const fieldsData: FieldItem[] = [
  {
    title: "Campaigns",
    count: 52,
  },
  {
    title: "Passed",
    count: 14,
    children: [
      { title: "Blocked", count: 0 },
      { title: "Alert", count: 14 },
    ],
  },
  {
    title: "Failed",
    count: 38,
    children: [
      { title: "Logged", count: 12 },
      { title: "None", count: 26 },
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
                          : child.title === "None"
                          ? "red"
                          : child.title === "Alert"
                          ? "green"
                          : child.title === "Logged"
                          ? "orange"
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
