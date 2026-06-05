"use client";

import Link
from "next/link";

import {

  AlertTriangle,

  CheckCircle2,

  ChevronRight,

  Wallet,

} from "lucide-react";

import {
  useDashboardStore,
} from "@/stores/useDashboardStore";

export default function MonthlyAnalysis() {

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
  VALUES
  ━━━━━━━━━━━━━━━━━━━
  */
  const income =
    summary?.totalIncome || 0;

  const expense =
    summary?.totalExpense || 0;

  const savings =
    income - expense;

  const savingsRate =
    financialHealth
      ?.savingRatio || 0;

  /*
  ━━━━━━━━━━━━━━━━━━━
  STATUS
  ━━━━━━━━━━━━━━━━━━━
  */
  let status =
    "Boros";

  let theme = {

    text:
      "text-red-600",

    bg:
      "bg-red-100",

    softBg:
      "bg-red-50",

    icon: (

      <AlertTriangle
        className="
          h-6
          w-6
          text-red-600
        "
      />

    ),

    message:
      "Pengeluaranmu cukup tinggi bulan ini.",

    label:
      "Perlu Diperbaiki",

  };

  /*
  ━━━━━━━━━━━━━━━━━━━
  VERY GOOD
  ━━━━━━━━━━━━━━━━━━━
  */
  if (
    savingsRate >= 40
  ) {

    status =
      "Sangat Hemat";

    theme = {

      text:
        "text-green-600",

      bg:
        "bg-green-100",

      softBg:
        "bg-green-50",

      icon: (

        <CheckCircle2
          className="
            h-6
            w-6
            text-green-600
          "
        />

      ),

      message:
        "Keuanganmu sangat sehat bulan ini.",

      label:
        "Sangat Stabil",

    };

  }

  /*
  ━━━━━━━━━━━━━━━━━━━
  NORMAL
  ━━━━━━━━━━━━━━━━━━━
  */
  else if (
    savingsRate >= 20
  ) {

    status =
      "Cukup";

    theme = {

      text:
        "text-yellow-500",

      bg:
        "bg-yellow-100",

      softBg:
        "bg-yellow-50",

      icon: (

        <Wallet
          className="
            h-6
            w-6
            text-yellow-500
          "
        />

      ),

      message:
        "Kondisi finansialmu cukup baik.",

      label:
        "Masih Aman",

    };

  }

  return (

    <Link href="/analysis">

      <div
        className="
          cursor-pointer
          rounded-[28px]
          border
          border-slate-200
          bg-white
          p-6
          shadow-sm
          transition-all
          duration-300
          hover:-translate-y-1
          hover:shadow-xl
        "
      >

        {/* HEADER */}
        <div
          className="
            flex
            items-start
            justify-between
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
              Analisis Bulan Ini
            </h2>

            <p
              className="
                mt-2
                text-slate-500
              "
            >
              Ringkasan kondisi
              finansial kamu
            </p>

          </div>

          <div
            className="
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-2xl
              border
              border-slate-200
            "
          >

            <ChevronRight
              className="
                h-5
                w-5
                text-slate-500
              "
            />

          </div>

        </div>

        {/* STATUS */}
        <div
          className={`
            mt-3
            rounded-3xl
            p-5
            ${theme.softBg}
          `}
        >

          <div
            className="
              flex
              items-center
              gap-4
            "
          >

            {/* ICON */}
            <div
              className={`
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-2xl
                ${theme.bg}
              `}
            >

              {theme.icon}

            </div>

            {/* TEXT */}
            <div>

              <p
                className="
                  text-sm
                  text-slate-500
                "
              >
                Status Finansial
              </p>

              <h3
                className={`
                  mt-1
                  text-2xl
                  font-black
                  ${theme.text}
                `}
              >
                {status}
              </h3>

            </div>

          </div>

          {/* MESSAGE */}
          <p
            className="
              mt-4
              text-sm
              leading-relaxed
              text-slate-600
            "
          >
            {theme.message}
          </p>

          {/* STATS */}
          <div
            className="
              mt-4
              grid
              grid-cols-3
              gap-3
            "
          >

            {/* INCOME */}
            <div
              className="
                rounded-2xl
                bg-white/70
                p-3
              "
            >

              <p
                className="
                  text-xs
                  text-slate-500
                "
              >
                Pemasukan
              </p>

              <h4
                className="
                  mt-1
                  text-sm
                  font-black
                "
              >
                Rp{" "}

                {income.toLocaleString(
                  "id-ID"
                )}

              </h4>

            </div>

            {/* EXPENSE */}
            <div
              className="
                rounded-2xl
                bg-white/70
                p-3
              "
            >

              <p
                className="
                  text-xs
                  text-slate-500
                "
              >
                Pengeluaran
              </p>

              <h4
                className="
                  mt-1
                  text-sm
                  font-black
                "
              >
                Rp{" "}

                {expense.toLocaleString(
                  "id-ID"
                )}

              </h4>

            </div>

            {/* SAVING */}
            <div
              className="
                rounded-2xl
                bg-white/70
                p-3
              "
            >

              <p
                className="
                  text-xs
                  text-slate-500
                "
              >
                Tabungan
              </p>

              <h4
                className="
                  mt-1
                  text-sm
                  font-black
                "
              >
                {savingsRate.toFixed(
                  0
                )}
                %
              </h4>

            </div>

          </div>

        </div>

      </div>

    </Link>

  );

}