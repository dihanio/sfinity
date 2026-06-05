"use client";

import {

  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,

} from "recharts";

export default function MonthlyTrendChart({
  data,
}) {

  return (

    <div
      className="
        rounded-[32px]
        border
        border-slate-200
        bg-white
        p-6
        h-[400px]
      "
    >

      <h2
        className="
          text-xl
          font-black
          text-slate-900
          mb-6
        "
      >
        Monthly Trend
      </h2>

      <ResponsiveContainer
        width="100%"
        height="100%"
      >

        <BarChart
          data={data}
        >

          <XAxis
            dataKey="month"
          />

          <YAxis />

          <Tooltip />

          <Bar
            dataKey="income"
            fill="#16a34a"
          />

          <Bar
            dataKey="expense"
            fill="#dc2626"
          />

        </BarChart>

      </ResponsiveContainer>

    </div>

  );

}