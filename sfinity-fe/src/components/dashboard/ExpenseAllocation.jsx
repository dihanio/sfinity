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
  useTransactionStore,
} from "@/stores/useTransactionStore";

const COLORS = [
  "#2563eb",
  "#ef4444",
  "#38bdf8",
  "#22c55e",
  "#a855f7",
  "#f59e0b",
];

export default function ExpenseAllocation() {

  /*
    TRANSACTIONS
  */
  const transactions =
    useTransactionStore(
      (state) =>
        state.transactions
    );

  /*
    EXPENSE ONLY
  */
  const expenses =
    useMemo(() => {

      return transactions.filter(
        (item) =>
          item.type ===
          "expense"
      );

    }, [transactions]);

  /*
    GROUP CATEGORY
  */
  const chartData =
    useMemo(() => {

      const grouped = {};

      expenses.forEach((item) => {

        grouped[item.category] =

          (
            grouped[
              item.category
            ] || 0
          ) +

          Math.abs(
            Number(
              item.amount || 0
            )
          );

      });

      return Object.entries(
        grouped
      ).map(
        ([category, value]) => ({

          name: category,

          value,

        })
      );

    }, [expenses]);

  /*
    TOTAL
  */
  const totalExpense =
    useMemo(() => {

      return chartData.reduce(

        (acc, item) =>

          acc + item.value,

        0

      );

    }, [chartData]);

  return (
    <div
      className="
        rounded-[32px]
        border
        border-slate-200
        bg-white
        p-6
        shadow-sm
      "
    >

      {/* HEADER */}
      <div className="flex items-start justify-between">

        <div>

          <h2
            className="
              text-2xl
              font-black
              text-slate-900
            "
          >
            Alokasi Pengeluaran
          </h2>

          <p
            className="
              mt-2
              text-slate-500
            "
          >
            Distribusi pengeluaran bulanan
          </p>

        </div>

        <div
          className="
            rounded-xl
            bg-slate-100
            px-4
            py-2
            text-sm
            font-semibold
            text-slate-700
          "
        >
          Rp{" "}

          {totalExpense.toLocaleString(
            "id-ID"
          )}

        </div>

      </div>

      {/* EMPTY */}
      {
        chartData.length === 0 ? (

          <div
            className="
              flex
              h-[320px]
              items-center
              justify-center
              text-slate-400
            "
          >
            Belum ada data pengeluaran
          </div>

        ) : (

          <>
            {/* CHART */}
            <div className="mt-8 h-[320px]">

              <ResponsiveContainer
                width="100%"
                height="100%"
              >

                <PieChart>

                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={120}
                    paddingAngle={3}
                    dataKey="value"
                  >

                    {
                      chartData.map(
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
                      )
                    }

                  </Pie>

                  <Tooltip
                    formatter={(
                      value
                    ) => [

                      `Rp ${Number(
                        value
                      ).toLocaleString(
                        "id-ID"
                      )}`,

                      "Total",

                    ]}
                  />

                </PieChart>

              </ResponsiveContainer>

            </div>

            {/* LIST */}
            <div className="mt-6 space-y-4">

              {
                chartData.map(
                  (
                    item,
                    index
                  ) => {

                    const percentage =

                      totalExpense > 0

                        ? (
                            (
                              item.value /
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
                        "
                      >

                        {/* LEFT */}
                        <div className="flex items-center gap-3">

                          <div
                            className="
                              h-3
                              w-3
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

                          <span
                            className="
                              text-sm
                              font-medium
                              text-slate-700
                            "
                          >
                            {item.name}
                          </span>

                        </div>

                        {/* RIGHT */}
                        <div className="text-right">

                          <p
                            className="
                              text-sm
                              font-semibold
                              text-slate-900
                            "
                          >
                            Rp{" "}

                            {item.value.toLocaleString(
                              "id-ID"
                            )}

                          </p>

                          <p
                            className="
                              text-xs
                              text-slate-400
                            "
                          >
                            {percentage}%
                          </p>

                        </div>

                      </div>
                    );
                  }
                )
              }

            </div>
          </>
        )
      }

    </div>
  );
}