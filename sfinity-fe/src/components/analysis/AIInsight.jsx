"use client";

import { Sparkles, AlertTriangle, Play } from "lucide-react";
import { useMemo } from "react";
import { useDashboardStore } from "@/stores/useDashboardStore";
import { useBudgetStore } from "@/stores/useBudgetStore";

export default function AIInsight({ aiAnalysis }) {
  /*
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  DASHBOARD STORE
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  */
  const {
    summary,
    financialHealth,
    categoryAnalytics,
    recentTransactions,
  } = useDashboardStore();

  /*
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  BUDGET STORE
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  */
  const { budgets } = useBudgetStore();

  /*
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  VALUES
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  */
  const income = summary?.totalIncome || 0;
  const expense = summary?.totalExpense || 0;
  const savingRatio = financialHealth?.savingRatio || 0;

  /*
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  INSIGHTS
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  */
  const insightsData = useMemo(() => {
    // If AI data is available, prioritize it
    if (aiAnalysis && aiAnalysis.rekomendasi) {
      return {
        isAI: true,
        tagline: aiAnalysis.rekomendasi.tagline,
        risks: aiAnalysis.rekomendasi.risiko || [],
        actions: aiAnalysis.rekomendasi.tindakan_darurat || []
      };
    }

    const result = [];
    /*
    NO DATA
    */
    if (recentTransactions.length === 0) {
      return {
        isAI: false,
        insights: ["Tambahkan transaksi untuk mendapatkan AI Insight."]
      };
    }

    /*
    GOOD SAVING
    */
    if (savingRatio >= 30) {
      result.push(
        `Kamu berhasil menabung ${Math.round(savingRatio)}% dari pemasukan bulan ini.`
      );
    }

    /*
    LOW SAVING
    */
    if (savingRatio < 10) {
      result.push(
        "Saving rate kamu masih rendah. Coba kurangi pengeluaran tidak penting."
      );
    }

    /*
    TOP CATEGORY
    */
    const topCategory = [...categoryAnalytics].sort((a, b) => b.amount - a.amount)[0];
    if (topCategory) {
      result.push(
        `Pengeluaran terbesar ada di kategori ${topCategory.name} sebesar Rp ${topCategory.amount.toLocaleString("id-ID")}.`
      );
    }

    /*
    BUDGET WARNING
    */
    budgets.forEach((budget) => {
      const category = categoryAnalytics.find((item) => item.name === budget.category);
      const used = category?.amount || 0;
      const percentage = budget.limit > 0 ? (used / budget.limit) * 100 : 0;

      if (percentage >= 80) {
        result.push(
          `Budget ${budget.category} hampir habis (${Math.round(percentage)}%).`
        );
      }
    });

    /*
    OVERSPENDING
    */
    if (expense > income) {
      result.push("Pengeluaranmu bulan ini lebih besar daripada pemasukan.");
    }

    return {
      isAI: false,
      insights: result.slice(0, 3)
    };

  }, [savingRatio, categoryAnalytics, budgets, expense, income, recentTransactions, aiAnalysis]);

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
      {/* HEADER */}
      <div
        className="
          flex
          items-center
          gap-4
        "
      >
        <div
          className="
            flex
            h-14
            w-14
            items-center
            justify-center
            rounded-2xl
            bg-purple-100
          "
        >
          <Sparkles
            className="
              h-7
              w-7
              text-purple-600
            "
          />
        </div>

        <div>
          <h2
            className="
              text-2xl
              font-black
              text-slate-900
            "
          >
            AI Insight
          </h2>
          <p
            className="
              mt-1
              text-slate-500
            "
          >
            {insightsData.isAI
              ? "Analisis risiko dan tindakan darurat dari AI"
              : "Analisis otomatis berdasarkan aktivitas finansial realtime"
            }
          </p>
        </div>
      </div>

      {/* CONTENT */}
      {insightsData.isAI ? (
        <div className="mt-6 space-y-6">
          {/* TAGLINE */}
          <div className="rounded-2xl bg-purple-50 p-4 border border-purple-100">
            <p className="font-semibold text-purple-900 leading-relaxed">
              {insightsData.tagline}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* RISKS LIST */}
            <div className="space-y-3">
              <h4 className="flex items-center gap-2 text-sm font-bold text-red-600 uppercase tracking-wider">
                <AlertTriangle className="h-4 w-4" /> Risiko Terdeteksi
              </h4>
              <div className="space-y-2">
                {insightsData.risks.map((risk, index) => (
                  <div key={index} className="rounded-xl bg-red-50/55 border border-red-100/50 p-3">
                    <p className="text-sm text-slate-700 leading-relaxed">
                      {risk}
                    </p>
                  </div>
                ))}
                {insightsData.risks.length === 0 && (
                  <p className="text-sm text-slate-400 italic">Tidak ada risiko kritis terdeteksi.</p>
                )}
              </div>
            </div>

            {/* ACTIONS LIST */}
            <div className="space-y-3">
              <h4 className="flex items-center gap-2 text-sm font-bold text-purple-600 uppercase tracking-wider">
                <Play className="h-4 w-4 fill-purple-600" /> Tindakan Darurat
              </h4>
              <div className="space-y-2">
                {insightsData.actions.map((action, index) => (
                  <div key={index} className="rounded-xl bg-purple-50/40 border border-purple-100/40 p-3">
                    <p className="text-sm text-slate-700 leading-relaxed">
                      {action}
                    </p>
                  </div>
                ))}
                {insightsData.actions.length === 0 && (
                  <p className="text-sm text-slate-400 italic">Kondisi aman, tidak butuh tindakan darurat.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* STANDARD Fallback LIST */
        <div
          className="
            mt-8
            space-y-4
          "
        >
          {insightsData.insights?.map((insight, index) => (
            <div
              key={index}
              className="
                rounded-2xl
                bg-slate-50
                p-4
              "
            >
              <p
                className="
                  leading-relaxed
                  text-slate-700
                "
              >
                {insight}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}