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
  useState,
  useEffect,
} from "react";

import {
  useReportStore,
} from "@/stores/useReportStore";

const COLORS = [

  "#2563eb",

  "#22c55e",

  "#f59e0b",

  "#ef4444",

  "#8b5cf6",

];

export default function
ExpenseCategoryChart() {

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  /*
  ━━━━━━━━━━━━━━━━━━━
  REPORT STORE
  ━━━━━━━━━━━━━━━━━━━
  */
  const {
    analytics,
  } =
    useReportStore();

  /*
  ━━━━━━━━━━━━━━━━━━━
  DATA
  ━━━━━━━━━━━━━━━━━━━
  */
  const data =

    analytics?.categoryBreakdown || [];

  /*
  ━━━━━━━━━━━━━━━━━━━
  TOTAL
  ━━━━━━━━━━━━━━━━━━━
  */
  const total =
    data.reduce(

      (acc, item) =>

        acc + item.value,

      0

    );

  /*
  ━━━━━━━━━━━━━━━━━━━
  TOP CATEGORY
  ━━━━━━━━━━━━━━━━━━━
  */
  const topCategory =
    useMemo(() => {

      if (
        data.length === 0
      ) {

        return null;

      }

      return [...data].sort(

        (a, b) =>

          b.value -
          a.value

      )[0];

    }, [data]);

  /*
  ━━━━━━━━━━━━━━━━━━━
  LOADING
  ━━━━━━━━━━━━━━━━━━━
  */
  if (!analytics) {

    return (

      <div
        className="
          rounded-[28px]
          border
          border-slate-200
          bg-white
          p-6
          shadow-sm
        "
      >

        <p className="text-slate-500">

          Loading analytics...

        </p>

      </div>

    );

  }

  return (

    <div
      className="
        rounded-[28px]
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

            Distribusi Pengeluaran

          </h2>

          <p
            className="
              mt-2
              text-slate-500
            "
          >

            Distribusi kategori
            pengeluaran bulan ini

          </p>

        </div>

        {/* BADGE */}
        {
          topCategory && (

            <div
              className="
                rounded-2xl
                bg-slate-100
                px-4
                py-3
                text-right
              "
            >

              <p
                className="
                  text-xs
                  text-slate-500
                "
              >

                Kategori Terbesar

              </p>

              <h3
                className="
                  mt-1
                  text-sm
                  font-black
                  text-slate-900
                "
              >

                {
                  topCategory.name
                }

              </h3>

            </div>

          )
        }

      </div>

      {/* EMPTY */}
      {
        data.length === 0 ? (

          <div
            className="
              mt-10
              rounded-2xl
              border
              border-dashed
              border-slate-200
              p-8
              text-center
            "
          >

            <p className="text-slate-500">

              Belum ada data
              pengeluaran

            </p>

          </div>

        ) : (

          <>

            {/* CHART */}
            <div className="mt-8 h-[260px]">

              {mounted ? (
                <ResponsiveContainer width="100%" height="100%" minWidth={0}>

                  <PieChart>

                    <Pie
                      data={data}
                      dataKey="value"
                      innerRadius={70}
                      outerRadius={110}
                      paddingAngle={4}
                    >

                      {
                        data.map(
                          (_, index) => (

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
                        )
                      }

                    </Pie>

                    <Tooltip />

                  </PieChart>

                </ResponsiveContainer>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-400">
                  Memuat chart...
                </div>
              )}

            </div>

            {/* LIST */}
            <div className="mt-6 space-y-4">

              {
                data.map(

                  (
                    item,
                    index
                  ) => {

                    const percentage =
                      Math.round(

                        (item.value /
                          total) *
                          100

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

                        {/* LEFT */}
                        <div
                          className="
                            flex
                            items-center
                            gap-3
                          "
                        >

                          {/* DOT */}
                          <div
                            style={{
                              backgroundColor:
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

                          {/* NAME */}
                          <div>

                            <h3
                              className="
                                font-semibold
                                text-slate-900
                              "
                            >

                              {
                                item.name
                              }

                            </h3>

                            <p
                              className="
                                mt-1
                                text-xs
                                text-slate-500
                              "
                            >

                              {
                                percentage
                              }%
                              dari total

                            </p>

                          </div>

                        </div>

                        {/* VALUE */}
                        <h3
                          className="
                            text-sm
                            font-black
                            text-slate-900
                          "
                        >

                          Rp{" "}

                          {
                            item.value.toLocaleString(
                              "id-ID"
                            )
                          }

                        </h3>

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