"use client";

import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const data = [
  { name: "Blocked", value: 32.6 },
  { name: "Alerted", value: 23.9 },
  { name: "Logged", value: 18.9 },
  { name: "None", value: 24.6 },
];

const COLORS = ["#4287f5", "#50c878", "#f5a142", "#f54242"];
// Blue, Green, Orange, Red

export default function ThreatPieChart() {
  return (
    <div className="w-full h-[400px] bg-white p-4 rounded-md">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ percent }) => `${(percent * 100).toFixed(1)}%`}
            outerRadius={100}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Legend align="right" layout="vertical" verticalAlign="middle" />
          <Tooltip
            contentStyle={{ backgroundColor: "#2d2d2d", border: "none" }}
            itemStyle={{ color: "#ffffff" }}
            cursor={{ fill: "transparent" }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
