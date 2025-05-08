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
import { DataEntry, metriciesData } from "./data";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const COLORS: Record<keyof Omit<DataEntry, "name">, string> = {
  Block: "#4287f5",
  Alert: "#50c878",
  Logged: "#f5a142",
  None: "#f54242",
};

const keys = ["None", "Logged", "Alert", "Block"] as const;

const chartData: ChartData<"bar"> = {
  labels: metriciesData.map((d) => d.name),
  datasets: keys.map((key) => ({
    label: key,
    data: metriciesData.map((d) => d[key]),
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
