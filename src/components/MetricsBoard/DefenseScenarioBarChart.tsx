"use client";

import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import React from "react";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

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

const chartData: ChartData<"bar"> = {
  labels: data.map((d) => d.name),
  datasets: keys.map((key) => ({
    label: key,
    data: data.map((d) => d[key]),
    backgroundColor: COLORS[key],
    stack: "defense",
  })),
};

const options: ChartOptions<"bar"> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      labels: {
        color: "#333",
        font: { size: 12 },
      },
    },
    tooltip: {
      backgroundColor: "#2d2d2d",
      titleColor: "#fff",
      bodyColor: "#fff",
      borderColor: "transparent",
    },
  },
  scales: {
    x: {
      stacked: true,
      ticks: { color: "#666" },
      grid: { display: false },
    },
    y: {
      stacked: true,
      ticks: {
        color: "#666",
        precision: 0,
      },
      grid: {
        color: "#aaa",
      },
    },
  },
};

export default function DefenseScenarioBarChart() {
  return (
    <div className="w-full h-[400px] bg-white p-4 rounded-md">
      <Bar data={chartData} options={options} />
    </div>
  );
}
