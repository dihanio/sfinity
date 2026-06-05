"use client";

import {
  useEffect,
} from "react";

import {
  useBudgetStore,
} from "@/stores/useBudgetStore";

import {
  formatRupiah,
} from "@/lib/formatRupiah";

export default function BudgetStats() {

  const {

    summary,

    fetchBudgets,

  } =
    useBudgetStore();
  /*
  ━━━━━━━━━━━━━━━━━━━
  FETCH
  ━━━━━━━━━━━━━━━━━━━
  */
  useEffect(() => {

  fetchBudgets();

}, [fetchBudgets]);

  const cards = [

    {

      title:
        "Total Budget",

      value:
        summary.totalBudget,

      color:
        "text-slate-900",

    },

    {

      title:
        "Pengeluaran",

      value:
        summary.totalSpent,

      color:
        "text-red-500",

    },

    {

      title:
        "Sisa Budget",

      value:
        summary.totalRemaining,

      color:
        "text-emerald-500",

    },

  ];

  return (

    <div
      className="
        grid
        gap-5
        md:grid-cols-3
      "
    >

      {
        cards.map(
          (card) => (

            <div

              key={
                card.title
              }

              className="
                rounded-[28px]
                border
                border-slate-200
                bg-white
                p-6
              "
            >

              <p className="text-slate-500">
                {card.title}
              </p>

              <h2
                className={`
                  mt-2
                  text-3xl
                  font-black
                  ${card.color}
                `}
              >

                {formatRupiah(
                  card.value
                )}

              </h2>

            </div>

          )
        )
      }

    </div>

  );

}
