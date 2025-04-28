"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

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
  return (
    <div className="bg-white p-4 rounded-md w-full h-[500px]">
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
