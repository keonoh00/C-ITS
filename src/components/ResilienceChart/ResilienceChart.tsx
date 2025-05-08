"use client";

import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Filler,
  Title,
  ChartOptions,
  ChartData,
  Plugin,
} from "chart.js";
import ChartDataLabels, {
  Context as DataLabelContext,
} from "chartjs-plugin-datalabels";
import { Line } from "react-chartjs-2";
import { useEffect, useState } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
  Title,
  ChartDataLabels
);

const rawData = [
  { runTime: new Date("2024-08-02T08:25:34"), score: 0 },
  { runTime: new Date("2024-08-02T10:25:34"), score: 0 },
  { runTime: new Date("2024-08-02T11:17:26"), score: 0 },
  { runTime: new Date("2024-08-02T13:42:32"), score: 50 },
  { runTime: new Date("2024-08-02T16:17:45"), score: 66 },
  { runTime: new Date("2024-08-02T18:17:45"), score: 66 },
];

const visibleIndices = new Set<number>([1, 2, 3, 4]);

export default function ResilienceChart() {
  const [height, setHeight] = useState<number>(400);

  useEffect(() => {
    const updateHeight = () => setHeight(window.innerHeight * 0.6);
    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  const labels = rawData.map((d) =>
    d.runTime.toLocaleDateString("en-CA", {
      year: "numeric",
      month: "short",
    })
  );

  const data: ChartData<"line", number[], string> = {
    labels,
    datasets: [
      {
        label: "Resilience Score",
        data: rawData.map((d) => d.score),
        borderColor: "#5fa8f6",
        backgroundColor: "#5fa8f6",
        borderWidth: 2,
        pointRadius: rawData.map((_, idx) => (visibleIndices.has(idx) ? 4 : 0)),
        pointHoverRadius: 5,
        tension: 0,
      },
    ],
  };

  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      datalabels: {
        align: "top",
        anchor: "end",
        backgroundColor: "#1e3a8a",
        borderRadius: 4,
        color: "white",
        padding: 6,
        font: {
          size: 12,
          weight: "bold",
        },
        display: (ctx: DataLabelContext) => visibleIndices.has(ctx.dataIndex),
        formatter: (value: number, context: DataLabelContext): string[] => {
          const idx = context.dataIndex;
          const timestamp = rawData[idx].runTime.toLocaleString("ko-KR", {
            year: "numeric",
            month: "numeric",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
          });
          return [`${idx + 1}회차 ${timestamp}`, `Score : ${value}`];
        },
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
      <Line
        data={data}
        options={options}
        plugins={[ChartDataLabels as Plugin]}
      />
    </div>
  );
}
