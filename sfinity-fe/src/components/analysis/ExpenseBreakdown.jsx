"use client";

import {

  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,

} from "recharts";

import {
  useMemo,
} from "react";

import {
  TrendingUp,
} from "lucide-react";

import {
  useDashboardStore,
} from "@/stores/useDashboardStore";

const COLORS = [

  "#2563eb",
  "#22c55e",
  "#f59e0b",
  "#ef4444",
  "#8b5cf6",
  "#06b6d4",

];

export default function ExpenseBreakdown() {

  /*
  ━━━━━━━━━━━━━━━━━━━
  DASHBOARD STORE
  ━━━━━━━━━━━━━━━━━━━
  */
  const {

    categoryAnalytics,

  } =
    useDashboardStore();

  /*
  ━━━━━━━━━━━━━━━━━━━
  CHART DATA
  ━━━━━━━━━━━━━━━━━━━
  */
  const chartData =
    categoryAnalytics || [];

  /*
  ━━━━━━━━━━━━━━━━━━━
  TOTAL EXPENSE
  ━━━━━━━━━━━━━━━━━━━
  */
  const totalExpense =
    useMemo(() => {

      return chartData.reduce(
        (acc, item) =>

          acc +
          (item.amount || 0),

        0
      );

    }, [chartData]);

  /*
  ━━━━━━━━━━━━━━━━━━━
  BIGGEST CATEGORY
  ━━━━━━━━━━━━━━━━━━━
  */
  const biggest =
    [...chartData].sort(
      (a, b) =>
        b.amount -
        a.amount
    )[0];

  return (

    <div
      className="
        rounded-[28px]
        bg-white
        border
        border-slate-200
        p-6
      "
    >

      {/* HEADER */}
      <div
        className="
          flex
          items-start
          justify-between
          gap-4
        "
      >

        <div>

          <h2
            className="
              text-2xl
              font-black
              text-slate-900
            "
          >
            Expense Breakdown
          </h2>

          <p
            className="
              text-slate-500
              mt-2
            "
          >
            Analisis kategori
            pengeluaran realtime
          </p>

        </div>

        <div
          className="
            px-4
            py-2
            rounded-2xl
            bg-red-100
            text-red-700
            text-sm
            font-semibold
          "
        >

          Rp{" "}

          {totalExpense.toLocaleString(
            "id-ID"
          )}

        </div>

      </div>

      {/* INSIGHT */}
      {biggest && (

        <div
          className="
            mt-6
            rounded-2xl
            bg-slate-50
            p-5
            flex
            items-center
            gap-4
          "
        >

          <div
            className="
              w-12
              h-12
              rounded-2xl
              bg-orange-100
              flex
              items-center
              justify-center
            "
          >

            <TrendingUp
              className="
                w-6
                h-6
                text-orange-500
              "
            />

          </div>

          <div>

            <p
              className="
                text-sm
                text-slate-500
              "
            >
              Pengeluaran terbesar
            </p>

            <h3
              className="
                text-lg
                font-black
                text-slate-900
              "
            >
              {biggest.name}
            </h3>

            <p
              className="
                text-sm
                text-slate-500
                mt-1
              "
            >

              Rp{" "}

              {biggest.amount.toLocaleString(
                "id-ID"
              )}

            </p>

          </div>

        </div>

      )}

      {/* CHART */}
      <div
        className="
          h-[320px]
          mt-8
        "
      >

        <ResponsiveContainer
          width="100%"
          height="100%"
        >

          <PieChart>

            <Pie
              data={chartData}
              innerRadius={75}
              outerRadius={110}
              paddingAngle={3}
              dataKey="amount"
            >

              {chartData.map(
                (
                  entry,
                  index
                ) => (

                  <Cell
                    key={`cell-${index}`}
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

      {/* CATEGORY LIST */}
      <div
        className="
          space-y-4
          mt-6
        "
      >

        {chartData.map(
          (
            item,
            index
          ) => {

            const percentage =
              totalExpense > 0

                ? (
                    (
                      item.amount /
                      totalExpense
                    ) * 100
                  ).toFixed(0)

                : 0;

            return (

              <div
                key={item.name}
                className="
                  flex
                  items-center
                  justify-between
                  rounded-2xl
                  bg-slate-50
                  p-4
                "
              >

                <div
                  className="
                    flex
                    items-center
                    gap-3
                  "
                >

                  {/* DOT */}
                  <div
                    className="
                      w-3
                      h-3
                      rounded-full
                    "
                    style={{
                      backgroundColor:
                        COLORS[
                          index %
                            COLORS.length
                        ],
                    }}
                  />

                  <div>

                    <p
                      className="
                        font-semibold
                        text-slate-900
                      "
                    >
                      {item.name}
                    </p>

                    <p
                      className="
                        text-xs
                        text-slate-400
                        mt-1
                      "
                    >
                      {percentage}%
                      dari total
                    </p>

                  </div>

                </div>

                <div className="text-right">

                  <p
                    className="
                      font-bold
                      text-slate-900
                    "
                  >

                    Rp{" "}

                    {item.amount.toLocaleString(
                      "id-ID"
                    )}

                  </p>

                </div>

              </div>

            );

          }
        )}

      </div>

    </div>

  );

}
