"use client";

import {
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const COLORS = [

  "#2563eb",
  "#16a34a",
  "#dc2626",
  "#9333ea",
  "#ea580c",

];

export default function CategoryPieChart({
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
        Category Analytics
      </h2>

      <ResponsiveContainer
        width="100%"
        height="100%"
      >

        <PieChart>

          <Pie
            data={data}
            dataKey="amount"
            nameKey="name"
            outerRadius={120}
          >

            {data.map(
              (
                entry,
                index
              ) => (

                <Cell
                  key={index}
                  fill={
                    COLORS[
                      index %
                        COLORS.length
                    ]
                  }
                />

              )
            )}

          </Pie>

          <Tooltip />

        </PieChart>

      </ResponsiveContainer>

    </div>

  );

}