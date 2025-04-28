"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LabelList,
  ResponsiveContainer,
  Legend,
  Text,
  Layer,
} from "recharts";

type DataEntry = {
  name: string;
  Blocked: number;
  Alerted: number;
  Logged: number;
  None: number;
};

const data: DataEntry[] = [
  { name: "Incident Responder", Blocked: 4, Alerted: 2, Logged: 3, None: 0 },
  { name: "MNX Hunter", Blocked: 0, Alerted: 6, Logged: 0, None: 0 },
  { name: "Elastic Hunter", Blocked: 8, Alerted: 7, Logged: 0, None: 1 },
  { name: "ETC", Blocked: 0, Alerted: 10, Logged: 6, None: 1 },
];

const COLORS: Record<keyof Omit<DataEntry, "name">, string> = {
  Blocked: "#4287f5",
  Alerted: "#50c878",
  Logged: "#f5a142",
  None: "#f54242",
};

const keys = ["Blocked", "Alerted", "Logged", "None"] as const;

export default function DefenseScenarioBarChart() {
  const getTotal = (entry: DataEntry): number =>
    keys.reduce((sum, key) => sum + (entry[key] ?? 0), 0);

  return (
    <div className="w-full h-[400px] bg-white p-4 rounded-md">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 60, right: 30, left: 20, bottom: 40 }}
          barCategoryGap={30}
        >
          <CartesianGrid vertical={false} stroke="#aaa" />
          <XAxis dataKey="name" stroke="#aaa" />
          <YAxis stroke="#aaa" allowDecimals={false} />
          <Tooltip
            contentStyle={{ backgroundColor: "#2d2d2d", border: "none" }}
            itemStyle={{ color: "#ffffff" }}
            cursor={{ fill: "transparent" }}
          />
          <Legend
            formatter={(value) => (
              <span style={{ color: "black", fontSize: "12px" }}>{value}</span>
            )}
          />

          {/* Stacked Bars */}
          {keys.map((key) => (
            <Bar key={key} dataKey={key} stackId="a" fill={COLORS[key]}>
              <LabelList
                dataKey={key}
                position="center"
                fill="#fff"
                fontSize={12}
                formatter={(value: number | string) =>
                  Number(value) > 0 ? `${value}` : ""
                }
              />
            </Bar>
          ))}

          {/* Top Total Numbers */}
          <Layer>
            {data.map((entry, index) => (
              <Text
                key={`total-${index}`}
                x={(index + 0.5) * (100 / data.length) + "%"}
                y={10}
                textAnchor="middle"
                fill="#ffffff"
                fontSize={14}
                fontWeight={700}
              >
                {getTotal(entry)}
              </Text>
            ))}
          </Layer>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
