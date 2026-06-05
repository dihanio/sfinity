"use client";

import {
  AlertTriangle,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";

import {
  useReportStore,
} from "@/stores/useReportStore";

import {
  formatRupiah,
} from "@/lib/formatRupiah";

export default function ReportBudgetProgress() {
  const { analytics } = useReportStore();

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
          Loading budget progress...
        </p>
      </div>
    );
  }

  const budgets = analytics.budgets || [];

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
        Status Anggaran Bulan Ini
      </h2>

      <p
        className="
          mt-2
          text-slate-500
        "
      >
        Realisasi pengeluaran terhadap limit budget
      </p>

      {budgets.length === 0 ? (
        <div
          className="
            mt-8
            rounded-2xl
            border
            border-dashed
            border-slate-200
            p-8
            text-center
          "
        >
          <p className="text-slate-500">
            Belum ada budget yang diatur bulan ini.
          </p>
        </div>
      ) : (
        <div className="mt-8 space-y-6">
          {budgets.map((budget) => {
            const categoryName = budget.category?.name || "Lainnya";

            const isDanger = budget.status === "danger";
            const isWarning = budget.status === "warning";

            const statusConfig = isDanger
              ? {
                  bg: "bg-red-100",
                  text: "text-red-600",
                  bar: "bg-red-500",
                  icon: <AlertTriangle size={14} />,
                  label: "Melebihi Limit",
                }
              : isWarning
              ? {
                  bg: "bg-yellow-100",
                  text: "text-yellow-600",
                  bar: "bg-yellow-500",
                  icon: <TrendingUp size={14} />,
                  label: "Hampir Habis",
                }
              : {
                  bg: "bg-emerald-100",
                  text: "text-emerald-600",
                  bar: "bg-emerald-500",
                  icon: <ShieldCheck size={14} />,
                  label: "Aman",
                };

            return (
              <div key={budget._id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-slate-900 capitalize">
                      {categoryName}
                    </h3>

                    <p className="text-xs text-slate-500 mt-0.5">
                      {formatRupiah(budget.spent)} / {formatRupiah(budget.limit)}
                    </p>
                  </div>

                  <div
                    className={`
                      inline-flex
                      items-center
                      gap-1.5
                      rounded-full
                      px-3
                      py-1
                      text-xs
                      font-bold
                      ${statusConfig.bg}
                      ${statusConfig.text}
                    `}
                  >
                    {statusConfig.icon}
                    <span>
                      {statusConfig.label} ({budget.percentage}%)
                    </span>
                  </div>
                </div>

                <div className="h-2.5 w-full rounded-full bg-slate-100 overflow-hidden">
                  <div
                    style={{ width: `${budget.percentage}%` }}
                    className={`h-full rounded-full transition-all duration-500 ${statusConfig.bar}`}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
