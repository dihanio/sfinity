"use client";

import {
  useMemo,
} from "react";

import {
  useReportStore,
} from "@/stores/useReportStore";

export default function
ReportSummaryCard() {

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
  SUMMARY
  ━━━━━━━━━━━━━━━━━━━
  */
  const summaries =
    useMemo(() => {

      /*
      NO DATA
      */
      if (!analytics) {

        return [];

      }

      const items = [];

      /*
      CASHFLOW
      */
      if (
        analytics.balance >= 0
      ) {

        items.push({

          title:
            "Cashflow Positif",

          description:
            "Pemasukan lebih besar dibanding pengeluaran.",

          bg:
            "bg-blue-50",

          titleColor:
            "text-blue-700",

          descColor:
            "text-blue-600",

        });

      } else {

        items.push({

          title:
            "Cashflow Negatif",

          description:
            "Pengeluaran melebihi pemasukan bulan ini.",

          bg:
            "bg-red-50",

          titleColor:
            "text-red-700",

          descColor:
            "text-red-600",

        });

      }

      /*
      SAVING RATE
      */
      if (
        analytics.savingRate >= 30
      ) {

        items.push({

          title:
            "Saving Sangat Baik",

          description:
            "Kondisi tabungan sangat sehat bulan ini.",

          bg:
            "bg-emerald-50",

          titleColor:
            "text-emerald-700",

          descColor:
            "text-emerald-600",

        });

      }

      else if (
        analytics.savingRate >= 10
      ) {

        items.push({

          title:
            "Saving Stabil",

          description:
            "Habit menabung cukup konsisten bulan ini.",

          bg:
            "bg-yellow-50",

          titleColor:
            "text-yellow-700",

          descColor:
            "text-yellow-600",

        });

      }

      else {

        items.push({

          title:
            "Saving Rendah",

          description:
            "Disarankan meningkatkan saving rate.",

          bg:
            "bg-orange-50",

          titleColor:
            "text-orange-700",

          descColor:
            "text-orange-600",

        });

      }

      /*
      OVERSPENDING
      */
      const dangerBudgets =

        analytics.budgets.filter(

          (item) =>

            item.status ===
            "danger"

        );

      if (
        dangerBudgets.length > 0
      ) {

        items.push({

          title:
            "Overspending Terdeteksi",

          description:
            `${dangerBudgets.length} budget melewati limit.`,

          bg:
            "bg-red-50",

          titleColor:
            "text-red-700",

          descColor:
            "text-red-600",

        });

      }

      return items;

    }, [analytics]);

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

      <h2
        className="
          text-2xl
          font-black
          text-slate-900
        "
      >

        Ringkasan Bulan Ini

      </h2>

      <div className="mt-8 space-y-5">

        {
          summaries.map(
            (
              item,
              index
            ) => (

              <div
                key={index}
                className={`
                  rounded-2xl
                  p-5
                  ${item.bg}
                `}
              >

                <h3
                  className={`
                    font-bold
                    ${item.titleColor}
                  `}
                >

                  {item.title}

                </h3>

                <p
                  className={`
                    mt-2
                    ${item.descColor}
                  `}
                >

                  {
                    item.description
                  }

                </p>

              </div>

            )
          )
        }

      </div>

    </div>

  );

}