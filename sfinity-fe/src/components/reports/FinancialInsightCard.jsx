"use client";

import {
  Lightbulb,
} from "lucide-react";

import {
  useReportStore,
} from "@/stores/useReportStore";

export default function
FinancialInsightCard() {

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

      <div className="flex items-center gap-4">

        <div
          className="
            flex
            h-14
            w-14
            items-center
            justify-center
            rounded-2xl
            bg-yellow-100
          "
        >

          <Lightbulb
            className="
              h-7
              w-7
              text-yellow-500
            "
          />

        </div>

        <div>

          <h2
            className="
              text-2xl
              font-black
              text-slate-900
            "
          >

            AI Insight

          </h2>

          <p
            className="
              mt-1
              text-slate-500
            "
          >

            Analisis finansial otomatis

          </p>

        </div>

      </div>

      <div
        className="
          mt-8
          rounded-2xl
          bg-slate-50
          p-5
        "
      >

        <p
          className="
            leading-relaxed
            text-slate-700
          "
        >

          {
            analytics.insight
          }

        </p>

      </div>

    </div>

  );

}