"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

import {
  useMemo,
} from "react";

import {
  useTransactionStore,
} from "@/stores/useTransactionStore";

export default function FinanceChart() {
  /*
    TRANSACTIONS
  */
  const {
    transactions,
  } =
    useTransactionStore();

  /*
    GROUP BY DAY
  */
  const chartData =
    useMemo(() => {
      const grouped = {};

      transactions.forEach(
        (transaction) => {
          const date =
            new Date(
              transaction.date
            );

          const day =
            date.toLocaleDateString(
              "id-ID",
              {
                day: "numeric",
                month: "short",
              }
            );

          /*
            INIT
          */
          if (
            !grouped[day]
          ) {
            grouped[day] = {
              date: day,

              income: 0,

              expense: 0,
            };
          }

          /*
            INCOME
          */
          if (
            transaction.type ===
            "income"
          ) {
            grouped[
              day
            ].income +=
              transaction.amount;
          }

          /*
            EXPENSE
          */
          if (
            transaction.type ===
            "expense"
          ) {
            grouped[
              day
            ].expense +=
              transaction.amount;
          }
        }
      );

      return Object.values(
        grouped
      );
    }, [transactions]);

  /*
    TOTALS
  */
  const totalIncome =
    chartData.reduce(
      (acc, item) =>
        acc + item.income,
      0
    );

  const totalExpense =
    chartData.reduce(
      (acc, item) =>
        acc + item.expense,
      0
    );

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
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2
            className="
              text-2xl
              font-black
              text-slate-900
            "
          >
            Ringkasan Keuangan
          </h2>

          <p
            className="
              text-slate-500
              mt-2
            "
          >
            Grafik pemasukan &
            pengeluaran realtime
          </p>
        </div>

        {/* SUMMARY */}
        <div className="flex gap-3">
          <div
            className="
              px-4
              py-2
              rounded-2xl
              bg-green-100
            "
          >
            <p
              className="
                text-xs
                text-green-700
              "
            >
              Income
            </p>

            <h3
              className="
                font-black
                text-green-800
              "
            >
              Rp{" "}
              {totalIncome.toLocaleString(
                "id-ID"
              )}
            </h3>
          </div>

          <div
            className="
              px-4
              py-2
              rounded-2xl
              bg-red-100
            "
          >
            <p
              className="
                text-xs
                text-red-700
              "
            >
              Expense
            </p>

            <h3
              className="
                font-black
                text-red-800
              "
            >
              Rp{" "}
              {totalExpense.toLocaleString(
                "id-ID"
              )}
            </h3>
          </div>
        </div>
      </div>

      {/* CHART */}
      <div className="h-[350px] mt-10">
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <AreaChart
            data={chartData}
          >
            {/* GRID */}
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#e2e8f0"
            />

            {/* X */}
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tick={{
                fontSize: 12,
              }}
            />

            {/* Y */}
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{
                fontSize: 12,
              }}
            />

            {/* TOOLTIP */}
            <Tooltip />

            {/* INCOME */}
            <Area
              type="monotone"
              dataKey="income"
              stroke="#22c55e"
              fill="#22c55e20"
              strokeWidth={3}
            />

            {/* EXPENSE */}
            <Area
              type="monotone"
              dataKey="expense"
              stroke="#ef4444"
              fill="#ef444420"
              strokeWidth={3}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}