"use client";

import {
  TrendingUp,
  AlertTriangle,
  ShieldCheck,
} from "lucide-react";
import { useMemo } from "react";
import { useDashboardStore } from "@/stores/useDashboardStore";

export default function PredictionCard({ aiAnalysis }) {
  /*
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  DASHBOARD STORE
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  */
  const {
    financialHealth,
    recentTransactions,
  } = useDashboardStore();

  /*
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  VALUES
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  */
  const score = financialHealth?.score || 0;
  const savingRatio = financialHealth?.savingRatio || 0;

  /*
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  PREDICTION
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  */
  const prediction = useMemo(() => {
    // If AI data is available, prioritize it
    if (aiAnalysis && aiAnalysis.prediksi) {
      const label = aiAnalysis.prediksi.label;
      const confidence = aiAnalysis.prediksi.confidence;
      const tagline = aiAnalysis.rekomendasi?.tagline || "Status Finansial AI";
      const probs = aiAnalysis.prediksi.probabilities || {};

      let iconBg = "bg-blue-100";
      let iconColor = "text-blue-600";
      let icon = <TrendingUp className="h-7 w-7" />;
      let badge = "Analisis AI";

      if (label === "Bahaya") {
        iconBg = "bg-red-100";
        iconColor = "text-red-600";
        icon = <AlertTriangle className="h-7 w-7" />;
        badge = "Bahaya 🔴";
      } else if (label === "Waspada") {
        iconBg = "bg-amber-100";
        iconColor = "text-amber-600";
        icon = <AlertTriangle className="h-7 w-7" />;
        badge = "Waspada 🟡";
      } else if (label === "Stabil") {
        iconBg = "bg-blue-100";
        iconColor = "text-blue-600";
        icon = <TrendingUp className="h-7 w-7" />;
        badge = "Stabil 🔵";
      } else if (label === "Sangat Sehat") {
        iconBg = "bg-emerald-100";
        iconColor = "text-emerald-600";
        icon = <ShieldCheck className="h-7 w-7" />;
        badge = "Sangat Sehat 🟢";
      }

      return {
        title: label,
        description: tagline,
        icon,
        iconBg,
        iconColor,
        badge: `${badge} (${confidence.toFixed(1)}% Confidence)`,
        probabilities: probs,
        isAI: true
      };
    }

    /*
    EMPTY
    */
    if (recentTransactions.length === 0) {
      return {
        title: "Belum Ada Data",
        description: "Tambahkan transaksi untuk melihat prediksi finansial.",
        icon: <TrendingUp className="h-6 w-6" />,
        iconBg: "bg-slate-100",
        iconColor: "text-slate-600",
        badge: "Belum Aktif",
        isAI: false
      };
    }

    /*
    HIGH RISK
    */
    if (score < 40 || savingRatio < 10) {
      return {
        title: "Risiko Tinggi",
        description: "Pengeluaranmu cukup tinggi dibanding pemasukan bulan ini.",
        icon: <AlertTriangle className="h-6 w-6" />,
        iconBg: "bg-red-100",
        iconColor: "text-red-600",
        badge: "Perlu Diperhatikan",
        isAI: false
      };
    }

    /*
    NORMAL
    */
    if (score < 75) {
      return {
        title: "Stabil",
        description: "Cashflow masih aman jika pola transaksi tetap konsisten.",
        icon: <TrendingUp className="h-6 w-6" />,
        iconBg: "bg-blue-100",
        iconColor: "text-blue-600",
        badge: "Masih Aman",
        isAI: false
      };
    }

    /*
    VERY GOOD
    */
    return {
      title: "Sangat Sehat",
      description: "Kamu berpotensi meningkatkan tabungan dan investasi bulan depan.",
      icon: <ShieldCheck className="h-6 w-6" />,
      iconBg: "bg-emerald-100",
      iconColor: "text-emerald-600",
      badge: "Kondisi Optimal",
      isAI: false
    };

  }, [score, savingRatio, recentTransactions, aiAnalysis]);

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
          items-start
          justify-between
          gap-4
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
            Prediksi Finansial
          </h2>
          <p
            className="
              mt-2
              text-slate-500
            "
          >
            {prediction.isAI 
              ? "Hasil analisis klasifikasi model Deep Learning AI" 
              : "Berdasarkan analytics realtime dan kondisi finansial terbaru"
            }
          </p>
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
            ${prediction.iconBg}
            ${prediction.iconColor}
          `}
        >
          {prediction.icon}
        </div>
      </div>

      {/* CONTENT */}
      <div
        className="
          mt-8
          rounded-[24px]
          bg-slate-50
          p-5
        "
      >
        {/* BADGE */}
        <div
          className="
            inline-flex
            rounded-full
            bg-white
            px-4
            py-2
            text-sm
            font-semibold
            text-slate-700
          "
        >
          {prediction.badge}
        </div>

        {/* TITLE */}
        <h1
          className="
            mt-5
            text-4xl
            font-black
            text-slate-900
          "
        >
          {prediction.title}
        </h1>

        {/* DESCRIPTION */}
        <p
          className="
            mt-4
            leading-relaxed
            text-slate-500
          "
        >
          {prediction.description}
        </p>

        {/* AI PROBABILITIES VISUALIZATION */}
        {prediction.isAI && prediction.probabilities && (
          <div className="mt-6 border-t border-slate-200 pt-5 space-y-3">
            <h4 className="text-sm font-bold text-slate-700">Tingkat Keyakinan Model AI:</h4>
            {[
              { name: "Sangat Sehat", value: prediction.probabilities["Sangat Sehat"] || prediction.probabilities["SangatSehat"] || 0, color: "bg-emerald-500" },
              { name: "Stabil", value: prediction.probabilities["Stabil"] || 0, color: "bg-blue-500" },
              { name: "Waspada", value: prediction.probabilities["Waspada"] || 0, color: "bg-amber-500" },
              { name: "Bahaya", value: prediction.probabilities["Bahaya"] || 0, color: "bg-red-500" }
            ].map((prob) => (
              <div key={prob.name} className="space-y-1">
                <div className="flex justify-between text-xs font-semibold text-slate-600">
                  <span>{prob.name}</span>
                  <span>{prob.value.toFixed(1)}%</span>
                </div>
                <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${prob.color} rounded-full transition-all duration-500`} 
                    style={{ width: `${prob.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}