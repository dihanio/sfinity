"use client";

import {
  Sparkles,
} from "lucide-react";

import {
  useGamificationStore,
} from "@/stores/useGamificationStore";

import {
  getLevelInfo,
} from "@/lib/getLevelInfo";

export default function LevelCard() {

  /*
  ━━━━━━━━━━━━━━━━━━━
  XP
  ━━━━━━━━━━━━━━━━━━━
  */
  const xp =
    useGamificationStore(
      (state) =>
        state.xp
    );

  /*
  ━━━━━━━━━━━━━━━━━━━
  LEVEL INFO
  ━━━━━━━━━━━━━━━━━━━
  */
  const levelInfo =
    getLevelInfo(xp);

  /*
  ━━━━━━━━━━━━━━━━━━━
  PROGRESS
  ━━━━━━━━━━━━━━━━━━━
  */
  const progress =
    levelInfo.progress;

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

      {/* TOP */}
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
              text-slate-500
            "
          >
            Level Kamu
          </p>

          <h2
            className="
              mt-2
              text-4xl
              font-black
              text-slate-900
            "
          >

            Level {
              levelInfo.level
            }

          </h2>

          <p
            className="
              mt-2
              text-sm
              text-slate-500
            "
          >

            {
              levelInfo.title
            }

          </p>

        </div>

      </div>

      {/* PROGRESS */}
      <div className="mt-8">

        <div
          className="
            flex
            items-center
            justify-between
          "
        >

          <p
            className="
              font-semibold
              text-slate-700
            "
          >
            XP Progress
          </p>

          <p
            className="
              text-sm
              text-slate-500
            "
          >

            {
              levelInfo.currentXP
            }

            {" / "}

            {
              levelInfo.nextXP
            }

            {" XP"}

          </p>

        </div>

        {/* BAR */}
        <div
          className="
            mt-4
            h-4
            w-full
            overflow-hidden
            rounded-full
            bg-slate-100
          "
        >

          <div
            className="
              h-full
              rounded-full
              bg-blue-100
              transition-all
              duration-500
            "
            style={{
              width:
                `${progress}%`,
            }}
          />

        </div>

        {/* PERCENT */}
        <div
          className="
            mt-2
            flex
            justify-end
          "
        >

          <p
            className="
              text-xs
              font-semibold
              text-slate-400
            "
          >

            {
              Math.floor(
                progress
              )
            }
            %

          </p>

        </div>

      </div>

      {/* INFO */}
      <div
        className="
          mt-8
          flex
          items-start
          gap-3
          rounded-2xl
          bg-blue-50
          p-4
        "
      >

        <Sparkles
          className="
            mt-1
            h-5
            w-5
            text-blue-600
          "
        />

        <p
          className="
            text-sm
            leading-relaxed
            text-slate-700
          "
        >

          Selesaikan mission,
          scan receipt,
          dan transaksi harian
          untuk mendapatkan XP
          dan membuka badge baru.

        </p>

      </div>

    </div>

  );

}