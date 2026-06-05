"use client";

import Image
from "next/image";

import {
  useUserStore,
} from "@/stores/useUserStore";

import {
  getLevelInfo,
} from "@/lib/getLevelInfo";

export default function LevelProgressCard() {

  /*
  ━━━━━━━━━━━━━━━━━━━
  USER
  ━━━━━━━━━━━━━━━━━━━
  */
  const user =
    useUserStore(
      (state) =>
        state.user
    );

  /*
  ━━━━━━━━━━━━━━━━━━━
  XP
  ━━━━━━━━━━━━━━━━━━━
  */
  const xp =
    user?.xp || 0;

  /*
  ━━━━━━━━━━━━━━━━━━━
  LEVEL INFO
  ━━━━━━━━━━━━━━━━━━━
  */
  const level =
    getLevelInfo(xp);

  return (

    <div
      className="
        rounded-[32px]
        border
        border-slate-200
        bg-white
        p-6
        shadow-sm
      "
    >

      <div className="flex items-center gap-5">

        {/* BADGE */}
        <div
          className="
            flex
            h-[100px]
            w-[100px]
            items-center
            justify-center
            rounded-3xl
            bg-slate-50
          "
        >

          <Image
            src={
              level.badge ||
              "/badges/level-1.png"
            }
            alt={
              level.title
            }
            width={100}
            height={100}
            className="object-contain"
          />

        </div>

        {/* INFO */}
        <div className="flex-1">

          {/* LEVEL */}
          <h2
            className="
              text-3xl
              font-black
              text-slate-900
            "
          >

            Level {level.level}

          </h2>

          {/* TITLE */}
          <p
            className="
              mt-1
              text-slate-500
            "
          >

            {level.title}

          </p>

          {/* XP */}
          <div className="mt-5">

            {/* LABEL */}
            <div
              className="
                mb-2
                flex
                items-center
                justify-between
                text-sm
                font-medium
              "
            >

              <span className="text-slate-600">

                {xp} XP

              </span>

              <span className="text-slate-400">

                Next:
                {" "}
                {level.nextXP} XP

              </span>

            </div>

            {/* BAR */}
            <div
              className="
                h-3
                overflow-hidden
                rounded-full
                bg-slate-300
              "
            >

              <div
                className="
                  h-full
                  rounded-full
                  bg-blue-500
                  transition-all
                  duration-500
                "
                style={{
                  width:
                    `${level.progress}%`,
                }}
              />

            </div>

            {/* PERCENT */}
            <p
              className="
                mt-2
                text-right
                text-xs
                font-semibold
                text-slate-400
              "
            >

              {Math.floor(
                level.progress
              )}%

            </p>

          </div>

        </div>

      </div>

    </div>

  );

}