"use client";

import {
  Wallet,
} from "lucide-react";

import {
  useMemo,
} from "react";

import {
  useTransactionStore,
} from "@/stores/useTransactionStore";

import {
  formatRupiah,
} from "@/lib/formatRupiah";

export default function BalanceCard() {
  /*
    STORE
  */
  const {
    transactions,

    getBalance,

    getTotalIncome,

    getTotalExpense,
  } =
    useTransactionStore();

  /*
    TOTALS
  */
  const balance =
    getBalance();

  const income =
    getTotalIncome();

  const expense =
    getTotalExpense();

  /*
    GROWTH
  */
  const growth =
    useMemo(() => {
      /*
        EMPTY
      */
      if (
        transactions.length ===
        0
      ) {
        return 0;
      }

      /*
        SIMPLE GROWTH
      */
      if (
        income === 0
      ) {
        return 0;
      }

      return Math.round(
        ((income -
          expense) /
          income) *
          100
      );
    }, [
      transactions,
      income,
      expense,
    ]);

  /*
    STATUS
  */
  const isPositive =
    growth >= 0;

  return (
    <div
      className="
        relative
        overflow-hidden
        rounded-[32px]
        border
        border-slate-200
        bg-white
        p-6
        shadow-sm
        md:p-8
      "
    >
      {/* TOP */}
      <div
        className="
          flex
          items-start
          justify-between
          gap-5
        "
      >
        <div>
          <p
            className="
              text-slate-500
            "
          >
            Saldo Bersih
          </p>

          <h1
            className="
              mt-4
              text-4xl
              font-black
              tracking-tight
              text-slate-900
              md:text-5xl
            "
          >
            {formatRupiah(
              balance
            )}
          </h1>

          <p
            className={`
              mt-4
              text-sm
              font-medium
              ${
                isPositive
                  ? "text-emerald-600"
                  : "text-red-500"
              }
            `}
          >
            {isPositive
              ? "+"
              : ""}
            {growth}% dari cashflow
          </p>
        </div>

        {/* ICON */}
        <div
          className="
            flex
            h-16
            w-16
            shrink-0
            items-center
            justify-center
            rounded-3xl
            bg-blue-100
          "
        >
          <Wallet
            className="
              h-8
              w-8
              text-blue-600
            "
          />
        </div>
      </div>

      {/* STATS */}
      <div
        className="
          mt-8
          grid
          grid-cols-2
          gap-4
        "
      >
        {/* INCOME */}
        <div
          className="
            rounded-2xl
            bg-slate-50
            p-4
          "
        >
          <p
            className="
              text-sm
              text-slate-500
            "
          >
            Pemasukan
          </p>

          <h3
            className="
              mt-2
              text-xl
              font-black
              text-emerald-600
            "
          >
            {formatRupiah(
              income
            )}
          </h3>
        </div>

        {/* EXPENSE */}
        <div
          className="
            rounded-2xl
            bg-slate-50
            p-4
          "
        >
          <p
            className="
              text-sm
              text-slate-500
            "
          >
            Pengeluaran
          </p>

          <h3
            className="
              mt-2
              text-xl
              font-black
              text-red-500
            "
          >
            {formatRupiah(
              expense
            )}
          </h3>
        </div>
      </div>
    </div>
  );
}