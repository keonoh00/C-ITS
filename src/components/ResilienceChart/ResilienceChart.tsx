// components/ResilienceChart.tsx
"use client";

import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Filler,
  ChartOptions,
  ChartData,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useEffect, useState } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler
);

const rawData = [
  { month: "Jan-24", score: 10 },
  { month: "Feb-24", score: 20 },
  { month: "Mar-24", score: 30 },
  { month: "Apr-24", score: 35 },
  { month: "May-24", score: 40 },
  { month: "Jun-24", score: 48 },
  { month: "Jul-24", score: 53 },
  { month: "Aug-24", score: 60 },
  { month: "Sep-24", score: 65 },
  { month: "Oct-24", score: 73 },
];

const visibleIndices = new Set([1, 3, 5, 7]);

const getCustomPointRadius = (index: number): number => {
  return visibleIndices.has(index) ? 5 : 0;
};

export default function ResilienceChart() {
  const [height, setHeight] = useState<number>(400);

  useEffect(() => {
    const updateHeight = () => setHeight(window.innerHeight * 0.6);
    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  const data: ChartData<"line"> = {
    labels: rawData.map((d) => d.month),
    datasets: [
      {
        label: "Resilience Score",
        data: rawData.map((d) => d.score),
        borderColor: "#5fa8f6",
        backgroundColor: "#5fa8f6",
        pointRadius: rawData.map((_, idx) => getCustomPointRadius(idx)),
        pointHoverRadius: rawData.map((_, idx) => getCustomPointRadius(idx)),
        pointHitRadius: rawData.map((_, idx) => getCustomPointRadius(idx)),
        borderWidth: 2,
        fill: false,
        tension: 0.4,
      },
    ],
  };

  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: "nearest",
      axis: "x",
      intersect: false,
    },
    plugins: {
      tooltip: {
        filter: (tooltipItem) => visibleIndices.has(tooltipItem.dataIndex),
      },
    },
    scales: {
      x: {
        ticks: { color: "#aaa" },
        grid: { color: "#444" },
      },
      y: {
        ticks: { color: "#aaa" },
        grid: { color: "#444" },
      },
    },
  };

  return (
    <div className="w-full bg-white p-4 rounded-md" style={{ height }}>
      <Line data={data} options={options} />
    </div>
  );
}
