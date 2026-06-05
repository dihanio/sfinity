"use client";

import {

  AreaChart,

  Area,

  XAxis,

  YAxis,

  CartesianGrid,

  ResponsiveContainer,

  Tooltip,

} from "recharts";

import { useState, useEffect } from "react";

import {

  useReportStore,

} from "@/stores/useReportStore";

export default function
MonthlyCashflowChart() {

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const {

    analytics,

  } =
    useReportStore();

 if (!analytics) {

  return (

    <div
      className="
        rounded-[28px]
        border
        border-slate-200
        bg-white
        p-6
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

      <h2
        className="
          text-2xl
          font-black
          text-slate-900
        "
      >

        Cashflow Bulanan

      </h2>

      <p
        className="
          mt-2
          text-slate-500
        "
      >

        Pemasukan dan pengeluaran realtime

      </p>

      <div className="mt-10 h-[360px]">

        {mounted ? (
          <ResponsiveContainer width="100%" height="100%" minWidth={0}>

            <AreaChart
              data={
                analytics.monthlyCashflow
              }
            >

              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
              />

              <XAxis dataKey="month" />

              <YAxis />

              <Tooltip />

              <Area
                type="monotone"
                dataKey="income"
                name="Pemasukan"
                stroke="#22c55e"
                fill="#22c55e20"
              />

              <Area
                type="monotone"
                dataKey="expense"
                name="Pengeluaran"
                stroke="#ef4444"
                fill="#ef444420"
              />

            </AreaChart>

          </ResponsiveContainer>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-400">
            Memuat chart...
          </div>
        )}

      </div>

    </div>

  );

}