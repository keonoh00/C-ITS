"use client";

import clsx from "clsx";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { useEffect, useState } from "react";

const data = [
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

export default function ResilienceChart() {
  const [height, setHeight] = useState(400); // fallback default

  useEffect(() => {
    const updateHeight = () => {
      setHeight(window.innerHeight * 0.7); // 50% of viewport height
    };
    updateHeight(); // initial
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  return (
    <div className={clsx("bg-white p-4 rounded-md w-full")} style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#444" />
          <XAxis dataKey="month" stroke="#aaa" />
          <YAxis stroke="#aaa" />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="score"
            stroke="#5fa8f6"
            strokeWidth={3}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
