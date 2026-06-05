"use client";

import {
  ArrowDown,
  ArrowUp,
  Wallet,
} from "lucide-react";

import {
  useDashboardStore,
} from "@/stores/useDashboardStore";

export default function FinancialSummary() {

  /*
  ━━━━━━━━━━━━━━━━━━━
  STORE
  ━━━━━━━━━━━━━━━━━━━
  */
  const { summary } =
    useDashboardStore();

  /*
  ━━━━━━━━━━━━━━━━━━━
  SAFE VALUES
  ━━━━━━━━━━━━━━━━━━━
  */
  const balance =
    summary?.balance || 0;

  const income =
    summary?.totalIncome || 0;

  const expense =
    summary?.totalExpense || 0;

  /*
  ━━━━━━━━━━━━━━━━━━━
  CARDS
  ━━━━━━━━━━━━━━━━━━━
  */
  const cards = [
    {
      title: "Saldo",
      amount: balance,
      icon: Wallet,
      bg: "bg-blue-100",
      color: "text-blue-600",
    },
    {
      title: "Pemasukan",
      amount: income,
      icon: ArrowUp,
      bg: "bg-green-100",
      color: "text-green-600",
    },
    {
      title: "Pengeluaran",
      amount: expense,
      icon: ArrowDown,
      bg: "bg-red-100",
      color: "text-red-600",
    },
  ];

  return (

    <div
      className="
        grid
        grid-cols-1
        gap-6
        md:grid-cols-3
      "
    >

      {
        cards.map((card) => {

          const Icon =
            card.icon;

          return (

            <div

              key={card.title}

              className="
                rounded-[28px]
                border
                border-slate-200
                bg-white
                p-6
                shadow-sm
                transition-all
                hover:-translate-y-1
                hover:shadow-lg
              "
            >

              <div
                className="
                  flex
                  items-center
                  justify-between
                "
              >

                {/* TEXT */}
                <div>

                  <p
                    className="
                      text-sm
                      font-medium
                      text-slate-500
                    "
                  >
                    {card.title}
                  </p>

                  <h2
                    className="
                      mt-3
                      text-3xl
                      font-black
                      tracking-tight
                      text-slate-900
                    "
                  >

                    Rp{" "}

                    {Number(
                      card.amount || 0
                    ).toLocaleString(
                      "id-ID"
                    )}

                  </h2>

                </div>

                {/* ICON */}
                <div
                  className={`
                    flex
                    h-14
                    w-14
                    items-center
                    justify-center
                    rounded-2xl
                    ${card.bg}
                  `}
                >

                  <Icon
                    className={`
                      h-6
                      w-6
                      ${card.color}
                    `}
                  />

                </div>

              </div>

            </div>

          );

        })
      }

    </div>

  );

}