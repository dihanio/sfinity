"use client";

import {

  TrendingUp,

  TrendingDown,

  Wallet,

} from "lucide-react";

import {
  useTransactionStore,
} from "@/stores/useTransactionStore";

import {
  useGamificationStore,
} from "@/stores/useGamificationStore";

import {
  calculateFinancialHealth,
} from "@/lib/calculateFinancialHealth";

export default function AnalysisHeader() {

  /*
    STORE
  */
  const {
    getBalance,
    getTotalIncome,
    getTotalExpense,
  } =
    useTransactionStore();

  const streak =
    useGamificationStore(
      (state) =>
        state.streak
    );

  /*
    VALUES
  */
  const balance =
    getBalance();

  const income =
    getTotalIncome();

  const expense =
    getTotalExpense();

  /*
    HEALTH
  */
  const {
    score,
    status,
  } =
    calculateFinancialHealth({
      balance,
      income,
      expense,
      streak,
    });

  /*
    SAVING RATIO
  */
  const savingRatio =
    income > 0

      ? Math.round(
          (
            (
              income -
              expense
            ) / income
          ) * 100
        )

      : 0;

  /*
    STATUS COLOR
  */
  const statusColor =

    score >= 75

      ? "text-emerald-600"

      : score >= 50

      ? "text-yellow-500"

      : "text-red-500";

  /*
    STATS
  */
  const stats = [

    {
      title:
        "Saldo Bersih",

      value:
        `Rp ${balance.toLocaleString("id-ID")}`,

      icon:
        Wallet,

      bg:
        "bg-blue-50",

      color:
        "text-blue-600",
    },

    {
      title:
        "Saving Ratio",

      value:
        `${savingRatio}%`,

      icon:
        TrendingUp,

      bg:
        "bg-emerald-50",

      color:
        "text-emerald-600",
    },

    {
      title:
        "Pengeluaran",

      value:
        `Rp ${expense.toLocaleString("id-ID")}`,

      icon:
        TrendingDown,

      bg:
        "bg-red-50",

      color:
        "text-red-500",
    },

  ];

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

      {/* TOP */}
      <div
        className="
          flex
          flex-col
          gap-6
          lg:flex-row
          lg:items-end
          lg:justify-between
        "
      >

        {/* LEFT */}
        <div>

          <p
            className="
              text-sm
              font-semibold
              uppercase
              tracking-wide
              text-slate-400
            "
          >
            Financial Health
          </p>

          <div
            className="
              mt-3
              flex
              items-end
              gap-4
            "
          >

            <h1
              className={`
                text-6xl
                font-black
                tracking-tight
                ${statusColor}
              `}
            >
              {score}
            </h1>

            <div className="pb-2">

              <p
                className={`
                  text-xl
                  font-bold
                  ${statusColor}
                `}
              >
                {status}
              </p>

              <p
                className="
                  mt-1
                  text-sm
                  text-slate-500
                "
              >
                Kondisi finansial bulan ini
              </p>

            </div>

          </div>

        </div>

        {/* PROGRESS */}
        <div
          className="
            w-full
            max-w-[320px]
          "
        >

          <div
            className="
              flex
              items-center
              justify-between
              text-sm
              font-semibold
            "
          >

            <span
              className="
                text-slate-500
              "
            >
              Progress
            </span>

            <span
              className={statusColor}
            >
              {score}%
            </span>

          </div>

          <div
            className="
              mt-3
              h-3
              overflow-hidden
              rounded-full
              bg-slate-100
            "
          >

            <div
              style={{
                width:
                  `${score}%`,
              }}
              className={`
                h-full
                rounded-full
                transition-all
                duration-500

                ${
                  score >= 75

                    ? "bg-emerald-500"

                    : score >= 50

                    ? "bg-yellow-400"

                    : "bg-red-500"
                }
              `}
            />

          </div>

        </div>

      </div>

      {/* STATS */}
      <div
        className="
          mt-8
          grid
          grid-cols-1
          gap-4
          md:grid-cols-3
        "
      >

        {
          stats.map(
            (item) => {

              const Icon =
                item.icon;

              return (

                <div
                  key={item.title}
                  className="
                    rounded-3xl
                    bg-slate-50
                    p-5
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

                      <h3
                        className="
                          mt-2
                          text-2xl
                          font-black
                          text-slate-900
                        "
                      >
                        {item.value}
                      </h3>

                    </div>

                    <div
                      className={`
                        flex
                        h-12
                        w-12
                        items-center
                        justify-center
                        rounded-2xl
                        ${item.bg}
                      `}
                    >

                      <Icon
                        className={`
                          h-5
                          w-5
                          ${item.color}
                        `}
                      />

                    </div>

                  </div>

                </div>

              );

            }
          )
        }

      </div>

    </div>

  );

}