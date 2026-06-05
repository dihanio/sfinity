"use client";

import { useState, useEffect } from "react";

import {

  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,

} from "recharts";

import {
  useDashboardStore,
} from "@/stores/useDashboardStore";

const COLORS = [

  "#22c55e",
  "#3b82f6",
  "#a855f7",
  "#f59e0b",
  "#ef4444",
  "#06b6d4",
  "#64748b",

];

function getBadge(ratio) {

  if (ratio >= 25) {

    return {
      label: "Tinggi",
      color:
        "text-red-500",
    };

  }

  if (ratio >= 15) {

    return {
      label: "Sedang",
      color:
        "text-yellow-500",
    };

  }

  return {
    label: "Normal",
    color:
      "text-emerald-500",
  };

}

export default function
ExpenseDistribution() {

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  const categoryAnalytics =
    useDashboardStore(
      (state) =>
        state.categoryAnalytics
    );

  if (
    !categoryAnalytics ||
    categoryAnalytics.length === 0
  ) {

    return (

      <div
        className="
          rounded-[32px]
          border
          border-slate-200
          bg-white
          p-6
        "
      >

        <h2
          className="
            text-2xl
            font-black
          "
        >
          Distribusi Pengeluaran
        </h2>

        <p
          className="
            mt-4
            text-slate-500
          "
        >
          Belum ada data pengeluaran
        </p>

      </div>

    );

  }

  const topCategory =
    [...categoryAnalytics]
      .sort(
        (a, b) =>
          b.amount - a.amount
      )[0];

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
      <div
        className="
          flex
          items-start
          justify-between
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
            Distribusi Pengeluaran
          </h2>

          <p
            className="
              mt-2
              text-slate-500
            "
          >
            Distribusi pengeluaran bulan ini
          </p>

        </div>

        <div
          className="
            rounded-2xl
            bg-slate-100
            px-4
            py-3
          "
        >

          <p
            className="
              text-xs
              text-slate-500
            "
          >
            Pengeluaran Terbesar
          </p>

          <h3
            className="
              mt-1
              font-black
              text-slate-900
            "
          >
            {topCategory.name}
          </h3>

        </div>

      </div>

      {/* CONTENT */}
      <div
        className="
          mt-8
          grid
          gap-8
          lg:grid-cols-2
        "
      >

        {/* CHART */}
        <div
          className="
            h-[280px]
          "
        >

          {mounted ? (
            <ResponsiveContainer width="100%" height="100%" minWidth={0}>

              <PieChart>

                <Pie
                  data={
                    categoryAnalytics
                  }
                  dataKey="amount"
                  innerRadius={70}
                  outerRadius={110}
                  paddingAngle={4}
                >

                  {
                    categoryAnalytics.map(
                      (
                        item,
                        index
                      ) => (

                        <Cell
                          key={item.name}
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

              </PieChart>

            </ResponsiveContainer>
          ) : (
            <div className="w-full h-full flex items-center justify-center text-slate-400">
              Memuat chart...
            </div>
          )}

        </div>

        {/* LIST */}
        <div
          className="
            space-y-4
          "
        >

          {
            categoryAnalytics.map(
              (
                item,
                index
              ) => {

                const badge =
                  getBadge(
                    item.ratio
                  );

                return (

                  <div
                    key={
                      item.name
                    }
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

                      <div
                        style={{
                          background:
                            COLORS[
                              index %
                              COLORS.length
                            ],
                        }}
                        className="
                          h-4
                          w-4
                          rounded-full
                        "
                      />

                      <div>

                        <h3
                          className="
                            font-bold
                            capitalize
                          "
                        >
                          {item.name}
                        </h3>

                        <p
                          className="
                            text-xs
                            text-slate-500
                          "
                        >
                          Rp{" "}
                          {item.amount.toLocaleString(
                            "id-ID"
                          )}
                        </p>

                      </div>

                    </div>

                    <div
                      className="
                        text-right
                      "
                    >

                      <h3
                        className="
                          text-lg
                          font-black
                        "
                      >
                        {item.ratio}%
                      </h3>

                      <p
                        className={`
                          text-xs
                          font-semibold
                          ${badge.color}
                        `}
                      >
                        {badge.label}
                      </p>

                    </div>

                  </div>

                );

              }
            )
          }

        </div>

      </div>

    </div>

  );

}