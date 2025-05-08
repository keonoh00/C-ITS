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
} from "chart.js";
import annotationPlugin from "chartjs-plugin-annotation";
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
  annotationPlugin
);

const rawData = [
  { runTime: new Date("2024-01-24"), score: 10 },
  { runTime: new Date("2024-02-24"), score: 20 },
  { runTime: new Date("2024-03-24"), score: 30 },
  { runTime: new Date("2024-04-24"), score: 35 },
  { runTime: new Date("2024-05-24"), score: 40 },
  { runTime: new Date("2024-06-24"), score: 48 },
  { runTime: new Date("2024-07-24"), score: 53 },
  { runTime: new Date("2024-08-24"), score: 60 },
  { runTime: new Date("2024-09-24"), score: 65 },
  { runTime: new Date("2024-10-24"), score: 73 },
];

const visibleIndices = new Set([1, 3, 5, 7]);

export default function ResilienceChart() {
  const [height, setHeight] = useState<number>(400);

  useEffect(() => {
    const updateHeight = () => setHeight(window.innerHeight * 0.6);
    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  const labels = rawData.map((d) =>
    d.runTime.toLocaleDateString("en-CA", { year: "numeric", month: "short" })
  );

  const data: ChartData<"line"> = {
    labels,
    datasets: [
      {
        label: "Resilience Score",
        data: rawData.map((d) => d.score),
        borderColor: "#5fa8f6",
        backgroundColor: "#5fa8f6",
        pointRadius: rawData.map((_, i) => (visibleIndices.has(i) ? 4 : 0)),
        pointHoverRadius: 5,
        borderWidth: 2,
        fill: false,
        tension: 0.4,
      },
    ],
  };

  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        filter: (item) => visibleIndices.has(item.dataIndex),
      },
      annotation: {
        annotations: Object.fromEntries(
          Array.from(visibleIndices).map((idx) => [
            `label-${idx}`,
            {
              type: "label",
              xValue: labels[idx],
              yValue: rawData[idx].score,
              backgroundColor: "#fff",
              // borderColor: "#fff",
              borderWidth: 1,
              cornerRadius: 4,
              font: {
                size: 12,
                weight: "bold",
              },
              padding: 8,
              content: [
                `${(idx + 1) / 2}회차 ${rawData[idx].runTime.toLocaleString(
                  "en-CA"
                )}`,
                `Score : ${rawData[idx].score}`,
              ],
              yAdjust: -30,
              textAlign: "center",
              // color: "white",
              // callout: {
              //   display: true,
              //   position: "bottom",
              //   borderColor: "#5fa8f6",
              // },
            },
          ])
        ),
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
