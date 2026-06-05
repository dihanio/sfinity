"use client";

import {

  Wallet,

  TrendingUp,

  TrendingDown,

} from "lucide-react";

import {

  useReportStore,

} from "@/stores/useReportStore";

import {

  formatRupiah,

} from "@/lib/formatRupiah";

export default function
ReportStats() {

  const {

    analytics,

  } =
    useReportStore();

  /*
  LOADING
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
      "
    >

      <p className="text-slate-500">

        Loading analytics...

      </p>

    </div>

  );

}

  const cards = [

    {

      title:
        "Pemasukan",

      value:
        analytics.totalIncome,

      icon:
        TrendingUp,

      bg:
        "bg-emerald-100",

      color:
        "text-emerald-600",

    },

    {

      title:
        "Pengeluaran",

      value:
        analytics.totalExpense,

      icon:
        TrendingDown,

      bg:
        "bg-red-100",

      color:
        "text-red-500",

    },

    {

      title:
        "Saldo Bersih",

      value:
        analytics.balance,

      icon:
        Wallet,

      bg:
        "bg-blue-100",

      color:
        "text-blue-600",

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
        cards.map((item) => {

          const Icon =
            item.icon;

          return (

            <div

              key={
                item.title
              }

              className="
                rounded-[28px]
                border
                border-slate-200
                bg-white
                p-6
                shadow-sm
              "
            >

              <div
                className="
                  flex
                  items-center
                  justify-between
                "
              >

                <div>

                  <p
                    className="
                      text-sm
                      text-slate-500
                    "
                  >

                    {item.title}

                  </p>

                  <h2
                    className="
                      mt-3
                      text-3xl
                      font-black
                      text-slate-900
                    "
                  >

                    {formatRupiah(
                      item.value
                    )}

                  </h2>

                </div>

                <div
                  className={`
                    flex
                    h-14
                    w-14
                    items-center
                    justify-center
                    rounded-2xl
                    ${item.bg}
                  `}
                >

                  <Icon
                    className={`
                      h-7
                      w-7
                      ${item.color}
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