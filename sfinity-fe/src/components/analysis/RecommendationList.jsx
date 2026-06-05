"use client";

import { Lightbulb, ArrowUpRight, Award, ShieldAlert } from "lucide-react";
import { useMemo, useState } from "react";
import { useDashboardStore } from "@/stores/useDashboardStore";
import { generateRecommendations } from "@/lib/recommendationEngine";

export default function RecommendationList({ aiAnalysis }) {
  const [activeTab, setActiveTab] = useState("shortTerm");

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
  VALUES
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  */
  const score = financialHealth?.score || 0;
  const savingRatio = financialHealth?.savingRatio || 0;

  /*
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  AGGREGATION
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  */
  const analytics = useMemo(() => {
    let food = 0;
    let transport = 0;
    let entertainment = 0;

    categoryAnalytics.forEach((item) => {
      if (item.name === "Makanan" || item.name === "food") {
        food = item.amount;
      }
      if (item.name === "Transport" || item.name === "transportation") {
        transport = item.amount;
      }
      if (item.name === "Hiburan" || item.name === "entertainment") {
        entertainment = item.amount;
      }
    });

    return { food, transport, entertainment };
  }, [categoryAnalytics]);

  /*
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  RECOMMENDATIONS
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  */
  const recommendationsData = useMemo(() => {
    // If AI data is available, prioritize it
    if (aiAnalysis && aiAnalysis.rekomendasi) {
      return {
        isAI: true,
        targetPesan: aiAnalysis.rekomendasi.target?.pesan || "",
        shortTerm: aiAnalysis.rekomendasi.rekomendasi_jangka_pendek || [],
        longTerm: aiAnalysis.rekomendasi.rekomendasi_jangka_panjang || []
      };
    }

    if (recentTransactions.length === 0) {
      return {
        isAI: false,
        list: [
          {
            id: 1,
            icon: "📊",
            title: "Belum Ada Data",
            description: "Tambahkan transaksi untuk mendapatkan rekomendasi finansial.",
          },
        ]
      };
    }

    const localList = generateRecommendations({
      score,
      foodExpense: analytics.food,
      transportExpense: analytics.transport,
      entertainmentExpense: analytics.entertainment,
      savingRatio,
    });

    return {
      isAI: false,
      list: localList
    };

  }, [score, analytics, savingRatio, recentTransactions, aiAnalysis]);

  return (
    <div
      className="
        rounded-[28px]
        bg-white
        border
        border-slate-200
        p-6
        shadow-sm
      "
    >
      {/* HEADER */}
      <div
        className="
          flex
          items-start
          gap-4
        "
      >
        <div
          className="
            w-14
            h-14
            rounded-2xl
            bg-yellow-100
            flex
            items-center
            justify-center
            shrink-0
          "
        >
          <Lightbulb
            className="
              text-yellow-500
              w-7
              h-7
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
            AI Financial Recommendation
          </h2>
          <p
            className="
              text-slate-500
              mt-1
            "
          >
            {recommendationsData.isAI
              ? "Saran pencapaian target dan rekomendasi aksi dari AI"
              : "Insight berdasarkan analytics realtime finansialmu"
            }
          </p>
        </div>
      </div>

      {/* CONTENT */}
      {recommendationsData.isAI ? (
        <div className="mt-8 space-y-6">
          {/* TARGET MESSAGE BANNER */}
          {recommendationsData.targetPesan && (
            <div className="flex items-start gap-4 rounded-2xl bg-amber-50 border border-amber-100 p-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-700 shrink-0">
                <Award className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-md font-bold text-amber-900">Target Tabungan Bulanan</h4>
                <p className="mt-1 text-sm text-slate-700 leading-relaxed">
                  {recommendationsData.targetPesan}
                </p>
              </div>
            </div>
          )}

          {/* TABS BUTTONS */}
          <div className="flex gap-2 border-b border-slate-200 pb-px">
            <button
              onClick={() => setActiveTab("shortTerm")}
              className={`
                px-5 py-2.5 text-sm font-bold border-b-2 transition-all
                ${activeTab === "shortTerm"
                  ? "border-yellow-500 text-yellow-600"
                  : "border-transparent text-slate-500 hover:text-slate-700"
                }
              `}
            >
              Jangka Pendek
            </button>
            <button
              onClick={() => setActiveTab("longTerm")}
              className={`
                px-5 py-2.5 text-sm font-bold border-b-2 transition-all
                ${activeTab === "longTerm"
                  ? "border-yellow-500 text-yellow-600"
                  : "border-transparent text-slate-500 hover:text-slate-700"
                }
              `}
            >
              Jangka Panjang
            </button>
          </div>

          {/* TABS CONTENT */}
          <div className="space-y-3">
            {activeTab === "shortTerm" ? (
              recommendationsData.shortTerm.map((rec, index) => (
                <div
                  key={index}
                  className="
                    rounded-2xl border border-slate-200 p-5 bg-slate-50/50
                    hover:shadow-md hover:-translate-y-0.5 transition-all duration-300
                  "
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-xl shrink-0 border border-slate-100">
                      ⚡
                    </div>
                    <div>
                      <h4 className="text-md font-bold text-slate-900">Aksi Segera {index + 1}</h4>
                      <p className="text-slate-600 text-sm mt-1 leading-relaxed">
                        {rec}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              recommendationsData.longTerm.map((rec, index) => (
                <div
                  key={index}
                  className="
                    rounded-2xl border border-slate-200 p-5 bg-slate-50/50
                    hover:shadow-md hover:-translate-y-0.5 transition-all duration-300
                  "
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-xl shrink-0 border border-slate-100">
                      🎯
                    </div>
                    <div>
                      <h4 className="text-md font-bold text-slate-900">Target Masa Depan {index + 1}</h4>
                      <p className="text-slate-600 text-sm mt-1 leading-relaxed">
                        {rec}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      ) : (
        /* STANDARD Fallback LIST */
        <div
          className="
            space-y-4
            mt-8
          "
        >
          {recommendationsData.list?.map((item) => (
            <div
              key={item.id}
              className="
                rounded-2xl
                border
                border-slate-200
                p-5
                hover:shadow-lg
                hover:-translate-y-1
                transition-all
                duration-300
                cursor-pointer
                bg-slate-50
              "
            >
              <div
                className="
                  flex
                  items-start
                  gap-4
                "
              >
                <div
                  className="
                    w-12
                    h-12
                    rounded-2xl
                    bg-white
                    flex
                    items-center
                    justify-center
                    text-2xl
                    shrink-0
                  "
                >
                  {item.icon}
                </div>

                <div className="flex-1">
                  <div
                    className="
                      flex
                      items-start
                      justify-between
                      gap-4
                    "
                  >
                    <div>
                      <h3
                        className="
                          text-lg
                          font-black
                          text-slate-900
                        "
                      >
                        {item.title}
                      </h3>
                      <p
                        className="
                          text-slate-500
                          mt-2
                          leading-relaxed
                        "
                      >
                        {item.description}
                      </p>
                    </div>
                    <ArrowUpRight
                      className="
                        w-5
                        h-5
                        text-slate-400
                        shrink-0
                      "
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}