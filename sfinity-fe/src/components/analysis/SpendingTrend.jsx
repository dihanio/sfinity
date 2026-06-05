"use client";

import {

  LineChart,
  Line,
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

  TrendingUp,
  TrendingDown,

} from "lucide-react";

import {
  useDashboardStore,
} from "@/stores/useDashboardStore";

export default function SpendingTrend() {

  /*
  ━━━━━━━━━━━━━━━━━━━
  DASHBOARD STORE
  ━━━━━━━━━━━━━━━━━━━
  */
  const {

    monthlyData,

  } =
    useDashboardStore();

  /*
  ━━━━━━━━━━━━━━━━━━━
  CHART DATA
  ━━━━━━━━━━━━━━━━━━━
  */
  const chartData =
    monthlyData || [];

  /*
  ━━━━━━━━━━━━━━━━━━━
  TOTAL EXPENSE
  ━━━━━━━━━━━━━━━━━━━
  */
  const totalSpending =
    useMemo(() => {

      return chartData.reduce(
        (acc, item) =>

          acc +
          (item.expense || 0),

        0
      );

    }, [chartData]);

  /*
  ━━━━━━━━━━━━━━━━━━━
  AVERAGE EXPENSE
  ━━━━━━━━━━━━━━━━━━━
  */
  const averageSpending =
    chartData.length

      ? totalSpending /
        chartData.length

      : 0;

  /*
  ━━━━━━━━━━━━━━━━━━━
  HIGHEST EXPENSE
  ━━━━━━━━━━━━━━━━━━━
  */
  const highestSpending =
    Math.max(

      ...chartData.map(
        (item) =>
          item.expense || 0
      ),

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
            Tren Pengeluaran
          </h2>

          <p
            className="
              text-slate-500
              mt-2
            "
          >
            Analisis pengeluaran
            realtime bulanan
          </p>

        </div>

        <div
          className="
            px-4
            py-2
            rounded-2xl
            bg-red-100
            text-red-700
            font-semibold
            text-sm
          "
        >
          12 Bulan
        </div>

      </div>

      {/* STATS */}
      <div
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          gap-4
          mt-8
        "
      >

        {/* AVG */}
        <div
          className="
            rounded-2xl
            bg-slate-50
            p-5
          "
        >

          <div
            className="
              flex
              items-center
              gap-3
            "
          >

            <div
              className="
                w-11
                h-11
                rounded-2xl
                bg-blue-100
                flex
                items-center
                justify-center
              "
            >

              <TrendingUp
                className="
                  w-5
                  h-5
                  text-blue-600
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
                Rata-rata
              </p>

              <h3
                className="
                  text-xl
                  font-black
                  text-slate-900
                "
              >
                Rp{" "}

                {Math.round(
                  averageSpending
                ).toLocaleString(
                  "id-ID"
                )}

              </h3>

            </div>

          </div>

        </div>

        {/* HIGHEST */}
        <div
          className="
            rounded-2xl
            bg-slate-50
            p-5
          "
        >

          <div
            className="
              flex
              items-center
              gap-3
            "
          >

            <div
              className="
                w-11
                h-11
                rounded-2xl
                bg-red-100
                flex
                items-center
                justify-center
              "
            >

              <TrendingDown
                className="
                  w-5
                  h-5
                  text-red-600
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
                Pengeluaran Tertinggi
              </p>

              <h3
                className="
                  text-xl
                  font-black
                  text-slate-900
                "
              >
                Rp{" "}

                {highestSpending.toLocaleString(
                  "id-ID"
                )}

              </h3>

            </div>

          </div>

        </div>

      </div>

      {/* CHART */}
      <div
        className="
          h-[350px]
          mt-10
        "
      >

        <ResponsiveContainer
          width="100%"
          height="100%"
        >

          <LineChart
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
              dataKey="month"
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

            {/* EXPENSE LINE */}
            <Line
              type="monotone"
              dataKey="expense"
              stroke="#ef4444"
              strokeWidth={4}
              dot={{
                r: 5,
              }}
              activeDot={{
                r: 7,
              }}
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

    </div>

  );

}