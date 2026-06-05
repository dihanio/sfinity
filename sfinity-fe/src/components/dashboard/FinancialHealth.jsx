"use client";

import { useState, useEffect } from "react";

import {

  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
  ResponsiveContainer,

} from "recharts";

import {
  useDashboardStore,
} from "@/stores/useDashboardStore";

export default function FinancialHealth() {

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  /*
  ━━━━━━━━━━━━━━━━━━━
  DASHBOARD STORE
  ━━━━━━━━━━━━━━━━━━━
  */
  const {

    summary,

    financialHealth,

  } =
    useDashboardStore();


  /*
  ━━━━━━━━━━━━━━━━━━━
  FINANCIAL HEALTH
  ━━━━━━━━━━━━━━━━━━━
  */

  const score =
    financialHealth?.score || 0;

  const savingRatio =
    financialHealth
      ?.savingRatio || 0;

      const foodRatio =
  financialHealth?.foodRatio || 0;

const transportationRatio =
  financialHealth?.transportationRatio || 0;

const entertainmentRatio =
  financialHealth?.entertainmentRatio || 0;

const technologyRatio =
  financialHealth?.technologyRatio || 0;

const insight =
  financialHealth?.insight || "";

  /*
  ━━━━━━━━━━━━━━━━━━━
  STATUS
  ━━━━━━━━━━━━━━━━━━━
  */
 const status =
  financialHealth?.status ||
  "Belum Ada Data";

  /*
  ━━━━━━━━━━━━━━━━━━━
  COLORS
  ━━━━━━━━━━━━━━━━━━━
  */
  const statusColor =
    score >= 75
      ? "text-emerald-500"

      : score >= 50
      ? "text-yellow-500"
      : "text-red-500";

  const gaugeColor =
    score >= 75
      ? "#22c55e"
      
      : score >= 50
      ? "#facc15"
      : "#ef4444";

  /*
  ━━━━━━━━━━━━━━━━━━━
  CHART DATA
  ━━━━━━━━━━━━━━━━━━━
  */
  const data = [
    {
      name: "Score",
      value: score,
    },
  ];

  return (

    <div
      className="
        relative
        overflow-hidden
        rounded-[32px]
        border
        border-slate-200
        bg-white
        p-5
        shadow-sm
      "
    >

      {/* CONTENT */}
      <div className="relative z-10">

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

            {/* TITLE */}
            <h2
              className="
                text-3xl
                font-black
                text-slate-900
              "
            >
              Kesehatan Finansial
            </h2>

            {/* DESCRIPTION */}
            <p
              className="
                mt-2
                max-w-lg
                leading-relaxed
                text-slate-500
              "
            >
              Analisis realtime
              berdasarkan pemasukan,
              pengeluaran, dan rasio
              tabungan terbaru.
            </p>

          </div>

        </div>

        {/* SPEEDOMETER */}
        <div className="mt-1">

          <div
            className="
              relative
              h-[220px]
            "
          >

            {mounted ? (
              <ResponsiveContainer
                width="100%"
                height="100%"
                minWidth={0}
              >

                <RadialBarChart
                  innerRadius="78%"
                  outerRadius="100%"
                  data={data}
                  startAngle={180}
                  endAngle={0}
                >

                  <PolarAngleAxis
                    type="number"
                    domain={[0, 100]}
                    angleAxisId={0}
                    tick={false}
                  />

                  <RadialBar
                    minAngle={15}
                    background={{
                      fill: "#e2e8f0",
                    }}
                    clockWise
                    dataKey="value"
                    cornerRadius={40}
                    fill={gaugeColor}
                  />

                </RadialBarChart>

              </ResponsiveContainer>
            ) : (
              <div className="w-full h-full flex items-center justify-center text-slate-400">
                Memuat chart...
              </div>
            )}

            {/* CENTER */}
            <div
              className="
                absolute
                left-1/2
                top-[50%]
                flex
                -translate-x-1/2
                -translate-y-1/2
                flex-col
                items-center
              "
            >

              <h2
                className={`
                  text-7xl
                  leading-none
                  tracking-tight
                  font-black
                  ${statusColor}
                `}
              >
                {score}
              </h2>

              <p
                className={`
                  mt-2
                  text-xl
                  font-semibold
                  tracking-wide
                  ${statusColor}
                `}
              >
                {status}
              </p>

            </div>
          
          </div>
            <div
  className="
    mt-8
    rounded-2xl
    border
    border-emerald-100
    bg-emerald-50
    p-4
  "
>

  <h3
    className="
      font-bold
      text-emerald-700
    "
  >
    🤖 AI Insight
  </h3>

  <p
    className="
      mt-2
      text-sm
      text-slate-600
    "
  >
    {insight}
  </p>

</div>

        </div>

      </div>

    </div>

  );

}