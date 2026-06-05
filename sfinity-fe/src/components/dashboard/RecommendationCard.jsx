"use client";

import {
  useEffect,
  useMemo,
} from "react";

import {
  ArrowUpRight,
  PlayCircle,
  CheckCircle2,
  Flame,
  Eye,
  Sparkles,
} from "lucide-react";

import { toast } from "sonner";

import {
  useDashboardStore,
} from "@/stores/useDashboardStore";

import {
  useGamificationStore,
} from "@/stores/useGamificationStore";

import {
  useActivityStore,
} from "@/stores/useActivityStore";

import {
  useRecommendationStore,
} from "@/stores/useRecommendationStore";

import {
  generateRecommendations,
} from "@/lib/recommendationEngine";

import {
  XP_REWARDS,
} from "@/data/xpRewards";

import api
from "@/lib/api";

import {
  useUserStore,
} from "@/stores/useUserStore";

export default function RecommendationCard() {

  /*
  ━━━━━━━━━━━━━━━━━━━
  DASHBOARD STORE
  ━━━━━━━━━━━━━━━━━━━
  */
  const financialHealth =
    useDashboardStore(
      (state) =>
        state.financialHealth
    );

  const categoryAnalytics =
    useDashboardStore(
      (state) =>
        state.categoryAnalytics
    );

  const recentTransactions =
    useDashboardStore(
      (state) =>
        state.recentTransactions
    );

    const user =
  useUserStore(
    (state) =>
      state.user
  );


  const {
  recommendations,
  setRecommendations,

  activeChallenges,
  completedChallenges,

  viewedTips,

  startChallenge,
  completeChallenge,

  markTipAsViewed,

} =
  useRecommendationStore();

const setUser =
  useUserStore(
    (state) =>
      state.setUser
  );

  /*
  ━━━━━━━━━━━━━━━━━━━
  GAMIFICATION
  ━━━━━━━━━━━━━━━━━━━
  */
  const {

    streak,

    addXP,

  } =
    useGamificationStore();


  /*
  ━━━━━━━━━━━━━━━━━━━
  FINANCIAL SCORE
  ━━━━━━━━━━━━━━━━━━━
  */
  const score =
    financialHealth?.score || 0;

  const savingRatio =
    financialHealth
      ?.savingRatio || 0;

  /*
  ━━━━━━━━━━━━━━━━━━━
  CATEGORY ANALYTICS
  ━━━━━━━━━━━━━━━━━━━
  */
  const analytics =
    useMemo(() => {

      return categoryAnalytics.reduce(

        (acc, item) => {

          switch (
            item.name
          ) {

            case "Makanan":
              acc.food =
                item.amount;
              break;

            case "Transport":
              acc.transport =
                item.amount;
              break;

            case "Hiburan":
              acc.entertainment =
                item.amount;
              break;

            default:
              break;

          }

          return acc;

        },

        {

          food: 0,

          transport: 0,

          entertainment: 0,

        }

      );

    }, [categoryAnalytics]);

  /*
  ━━━━━━━━━━━━━━━━━━━
  GENERATE RECOMMENDATIONS
  ━━━━━━━━━━━━━━━━━━━
  */
  useEffect(() => {

    if (
      recentTransactions.length === 0
    ) {
      return;
    }

    if (!financialHealth) {
      return;
    }

    const data =
      generateRecommendations({

        score,

        foodExpense:
          analytics.food,

        transportExpense:
          analytics.transport,

        entertainmentExpense:
          analytics.entertainment,

        savingRatio,

        streak,

      });

    setRecommendations(
      data
    );

  }, [

    score,

    savingRatio,

    analytics.food,

    analytics.transport,

    analytics.entertainment,

    streak,

    recentTransactions,

    financialHealth,

    setRecommendations,

  ]);

  /*
  ━━━━━━━━━━━━━━━━━━━
  ACTION HANDLER
  ━━━━━━━━━━━━━━━━━━━
  */
/*
━━━━━━━━━━━━━━━━━━━
ACTION HANDLER
━━━━━━━━━━━━━━━━━━━
*/
async function handleClick(item) {

  /*
  ━━━━━━━━━━━━━━━━━━━
  VIDEO
  ━━━━━━━━━━━━━━━━━━━
  */
  if (
    item.type === "video"
  ) {

    try {

      const response =
        await api.post(
          "/videos/watch",
          {
            videoId: item.id,
            title: item.title,
          }
        );

      setUser(
        response.data.user
      );

      if (
        !response.data
          .alreadyWatched
      ) {

        toast.success(
          `+${XP_REWARDS.VIDEO_WATCH} XP`
        );

      } else {

        toast.info(
          "Video sudah pernah ditonton"
        );

      }

      if (item.url) {

        window.open(
          item.url,
          "_blank"
        );

      }

    } catch (error) {

      toast.error(
        "Gagal menyimpan progress video"
      );

      console.log(error);

    }

    return;

  }

  /*
  ━━━━━━━━━━━━━━━━━━━
  CHALLENGE
  ━━━━━━━━━━━━━━━━━━━
  */
  if (
    item.type === "challenge"
  ) {

    if (
      completedChallenges.includes(
        item.id
      )
    ) {

      toast.info(
        "Challenge sudah selesai"
      );

      return;

    }

    if (
      activeChallenges.includes(
        item.id
      )
    ) {

      completeChallenge(
        item.id
      );

      addXP(
        XP_REWARDS
          .COMPLETE_CHALLENGE
      );

      toast.success(
        "Challenge selesai"
      );

      return;

    }

    startChallenge(
      item.id
    );

    addXP(
      XP_REWARDS
        .START_CHALLENGE
    );

    toast.success(
      "Challenge dimulai"
    );

    return;

  }

  /*
  ━━━━━━━━━━━━━━━━━━━
  TIP
  ━━━━━━━━━━━━━━━━━━━
  */
  if (
    item.type === "tip"
  ) {

    markTipAsViewed(
      item.id
    );

    toast(
      item.description
    );

  }

}

  /*
  ━━━━━━━━━━━━━━━━━━━
  EMPTY STATE
  ━━━━━━━━━━━━━━━━━━━
  */
  const isEmpty =
    recommendations.length === 0;

  return (

    <section
      className="
        rounded-[32px]
        border
        border-slate-200
        bg-white
        p-6
        shadow-sm
      "
    >

      {/* HEADER */}
      <div>

        {/* LABEL */}
        <div
          className="
            inline-flex
            items-center
            gap-2
            rounded-full
            bg-slate-100
            px-3
            py-1.5
            text-[11px]
            font-bold
            uppercase
            tracking-[0.2em]
            text-slate-600
          "
        >

          <Sparkles
            className="
              h-3.5
              w-3.5
            "
          />

          AI Recommendations

        </div>

        {/* TITLE */}
        <h2
          className="
            mt-4
            text-3xl
            font-black
            tracking-tight
            text-slate-900
          "
        >
          Rekomendasi Untuk Kamu
        </h2>

        {/* DESCRIPTION */}
        <p
          className="
            mt-2
            text-sm
            leading-relaxed
            text-slate-500
          "
        >
          Insight personal berdasarkan
          kondisi finansial dan
          kebiasaan transaksi kamu.
        </p>

      </div>

      {/* EMPTY */}
      {isEmpty && (

        <div
          className="
            mt-6
            rounded-3xl
            border
            border-dashed
            border-slate-200
            bg-slate-50
            p-10
            text-center
          "
        >

          <div
            className="
              mx-auto
              flex
              h-14
              w-14
              items-center
              justify-center
              rounded-2xl
              bg-white
              text-2xl
              shadow-sm
            "
          >
            ✨
          </div>

          <h3
            className="
              mt-5
              text-xl
              font-black
              text-slate-900
            "
          >
            Belum Ada Rekomendasi
          </h3>

          <p
            className="
              mt-2
              text-sm
              leading-relaxed
              text-slate-500
            "
          >
            Tambahkan transaksi untuk
            mendapatkan insight dan
            rekomendasi personal.
          </p>

        </div>

      )}

      {/* LIST */}
      <div
        className="
          mt-6
          space-y-4
        "
      >

        {recommendations.map(
          (item) => {

            /*
            STATUS
            */
           const watched =
  user?.watchedVideos?.includes(
    item.id
  );

            const viewed =

              viewedTips.includes(
                item.id
              );

            const active =

              activeChallenges.includes(
                item.id
              );

            const completed =

              completedChallenges.includes(
                item.id
              );

            return (

              <div

                key={item.id}

                onClick={() =>
                  handleClick(
                    item
                  )
                }

                className="
                  group
                  cursor-pointer
                  rounded-3xl
                  border
                  border-slate-200
                  bg-slate-50
                  p-5
                  transition-all
                  duration-300
                  hover:border-slate-300
                  hover:bg-white
                  hover:shadow-md
                "
              >

                <div
                  className="
                    flex
                    items-start
                    gap-4
                  "
                >

                  {/* ICON */}
                  <div
                    className="
                      flex
                      h-12
                      w-12
                      shrink-0
                      items-center
                      justify-center
                      rounded-2xl
                      bg-white
                      text-xl
                      shadow-sm
                    "
                  >
                    {item.icon}
                  </div>

                  {/* CONTENT */}
                  <div className="flex-1 min-w-0">

                    {/* TOP */}
                    <div
                      className="
                        flex
                        items-start
                        justify-between
                        gap-4
                      "
                    >

                      <div className="min-w-0">

                        {/* TITLE */}
                        <h3
                          className="
                            text-lg
                            font-black
                            leading-tight
                            tracking-tight
                            text-slate-900
                          "
                        >
                          {item.title}
                        </h3>

                        {/* DESCRIPTION */}
                        <p
                          className="
                            mt-2
                            line-clamp-2
                            text-sm
                            leading-relaxed
                            text-slate-500
                          "
                        >
                          {
                            item.description
                          }
                        </p>

                      </div>

                      {/* ARROW */}
                      <div
                        className="
                          flex
                          h-10
                          w-10
                          shrink-0
                          items-center
                          justify-center
                          rounded-2xl
                          bg-blue-100
                          shadow-sm
                          transition-all
                          duration-300
                          group-hover:bg-blue-600
                        "
                      >

                        <ArrowUpRight
                          className="
                            h-4
                            w-4
                            text-black
                            transition-all
                            duration-300
                            group-hover:text-black
                          "
                        />

                      </div>

                    </div>

                    {/* BADGES */}
                    <div
                      className="
                        mt-4
                        flex
                        flex-wrap
                        gap-2
                      "
                    >

                      {/* TYPE */}
                      <div
                        className="
                          rounded-full
                          bg-white
                          px-2.5
                          py-1
                          text-[10px]
                          font-bold
                          uppercase
                          tracking-wide
                          text-slate-600
                          shadow-sm
                        "
                      >
                        {item.type}
                      </div>

                      {/* WATCHED */}
                      {watched && (

                        <div
                          className="
                            inline-flex
                            items-center
                            gap-1.5
                            rounded-full
                            bg-blue-100
                            px-2.5
                            py-1
                            text-[10px]
                            font-bold
                            text-blue-600
                          "
                        >

                          <PlayCircle
                            className="
                              h-3
                              w-3
                            "
                          />

                          Ditonton

                        </div>

                      )}

                      {/* VIEWED */}
                      {viewed && (

                        <div
                          className="
                            inline-flex
                            items-center
                            gap-1.5
                            rounded-full
                            bg-violet-100
                            px-2.5
                            py-1
                            text-[10px]
                            font-bold
                            text-violet-600
                          "
                        >

                          <Eye
                            className="
                              h-3
                              w-3
                            "
                          />

                          Dilihat

                        </div>

                      )}

                      {/* ACTIVE */}
                      {active && (

                        <div
                          className="
                            inline-flex
                            items-center
                            gap-1.5
                            rounded-full
                            bg-orange-100
                            px-2.5
                            py-1
                            text-[10px]
                            font-bold
                            text-orange-600
                          "
                        >

                          <Flame
                            className="
                              h-3
                              w-3
                            "
                          />

                          Berjalan

                        </div>

                      )}

                      {/* COMPLETED */}
                      {completed && (

                        <div
                          className="
                            inline-flex
                            items-center
                            gap-1.5
                            rounded-full
                            bg-emerald-100
                            px-2.5
                            py-1
                            text-[10px]
                            font-bold
                            text-emerald-600
                          "
                        >

                          <CheckCircle2
                            className="
                              h-3
                              w-3
                            "
                          />

                          Selesai

                        </div>

                      )}

                    </div>

                  </div>

                </div>

              </div>

            );

          }
        )}

      </div>

    </section>

  );

}
