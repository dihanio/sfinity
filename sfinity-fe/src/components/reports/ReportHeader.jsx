"use client";

import {
  Activity,
} from "lucide-react";

export default function ReportHeader() {
  return (
    <div
      className="
        relative
      "
    >
      <div
        className="
          absolute
          -right-20
          -top-20
          h-64
          w-64
          rounded-full
          bg-blue-100
          blur-3xl
          opacity-60
        "
      />

      <div className="relative z-10">
        <h1
          className="
            mt-6
            text-4xl
            font-black
            tracking-tight
            text-slate-900
          "
        >
          Laporan Finansial
        </h1>

        <p
          className="
            mt-4
            max-w-2xl
            text-lg
            leading-relaxed
            text-slate-500
          "
        >
          Pantau performa keuangan,
          cashflow,
          pengeluaran,
          dan insight finansial realtime.
        </p>
      </div>
    </div>
  );
}