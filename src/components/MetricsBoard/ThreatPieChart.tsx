"use client";

import React from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import { Pie } from "react-chartjs-2";
import { metriciesData } from "./data";

ChartJS.register(ArcElement, Tooltip, Legend);

// const data = {
//   labels: ["Blocked", "Alerted", "Logged", "None"],
//   datasets: [
//     {
//       label: "Threat Ratio",
//       data: [32.6, 23.9, 18.9, 24.6],
//       backgroundColor: ["#4287f5", "#50c878", "#f5a142", "#f54242"],
//       borderColor: "#fff",
//       borderWidth: 1,
//     },
//   ],
// };

const totals = metriciesData.reduce(
  (acc, entry) => {
    acc.Blocked += entry.Block;
    acc.Alerted += entry.Alert;
    acc.Logged += entry.Logged;
    acc.None += entry.None;
    return acc;
  },
  { Blocked: 0, Alerted: 0, Logged: 0, None: 0 }
);

const totalSum = totals.Blocked + totals.Alerted + totals.Logged + totals.None;

const toPercent = (value: number) =>
  totalSum === 0 ? 0 : parseFloat(((value / totalSum) * 100).toFixed(1));

const data = {
  labels: ["Blocked", "Alerted", "Logged", "None"],
  datasets: [
    {
      label: "Threat Ratio (%)",
      data: [
        toPercent(totals.Blocked),
        toPercent(totals.Alerted),
        toPercent(totals.Logged),
        toPercent(totals.None),
      ],
      backgroundColor: ["#4287f5", "#50c878", "#f5a142", "#f54242"],
      borderColor: "#fff",
      borderWidth: 1,
    },
  ],
};
const options: ChartOptions<"pie"> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "right",
      align: "center",
      labels: {
        color: "#000",
        font: { size: 12 },
      },
    },
    tooltip: {
      backgroundColor: "#2d2d2d",
      titleColor: "#fff",
      bodyColor: "#fff",
      borderColor: "#333",
      borderWidth: 1,
    },
  },
};

export default function ThreatPieChart() {
  return (
    <div className="w-full h-[400px] bg-white p-4 rounded-md flex justify-center items-center">
      <div className="w-[80%] h-full">
        <Pie data={data} options={options} />
      </div>
    </div>
  );
}
