"use client";

import {
  PiggyBank,
} from "lucide-react";

import {
  useTransactionStore,
} from "@/stores/useTransactionStore";

export default function SavingsReportCard() {
  const {
    getTotalIncome,
    getTotalExpense,
  } = useTransactionStore();

  const income =
    getTotalIncome();

  const expense =
    getTotalExpense();

  const saving =
    income - expense;

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
            bg-emerald-100
          "
        >
          <PiggyBank className="h-7 w-7 text-emerald-600" />
        </div>

        <div>
          <h2 className="text-2xl font-black text-slate-900">
            Total Saving
          </h2>

          <p className="mt-1 text-slate-500">
            Tabungan bulan ini
          </p>
        </div>
      </div>

      <h3
        className="
          mt-8
          text-5xl
          font-black
          text-emerald-600
        "
      >
        Rp{" "}
        {saving.toLocaleString("id-ID")}
      </h3>
    </div>
  );
}