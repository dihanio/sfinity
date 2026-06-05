"use client";

import {
  Crown,
} from "lucide-react";

import {
  useUserStore,
} from "@/stores/useUserStore";

import {
  getLevelInfo,
} from "@/lib/getLevelInfo";

export default function ProfileLevelCard() {

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
  XP FROM BACKEND
  ━━━━━━━━━━━━━━━━━━━
  */
  const xp =
    user?.xp || 0;

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
        rounded-[32px]
        bg-blue-100
        p-8
        text-blue-600
      "
    >

      {/* TOP */}
      <div
        className="
          flex
          items-center
          gap-4
        "
      >

        {/* ICON */}
        <div
          className="
            flex
            h-14
            w-14
            items-center
            justify-center
            rounded-2xl
            bg-white/20
          "
        >

          <Crown
            className="
              h-7
              w-7
            "
          />

        </div>

        {/* TEXT */}
        <div>

          <p
            className="
              text-blue-100
            "
          >
            Current Level
          </p>

          <h2
            className="
              mt-1
              text-3xl
              font-black
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
              text-blue-100
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

        {/* TEXT */}
        <div
          className="
            flex
            items-center
            justify-between
            text-sm
          "
        >

          <span>

            {
              levelInfo.currentXP
            }
            {" XP"}

          </span>

          <span>

            {
              levelInfo.nextXP
            }
            {" XP"}

          </span>

        </div>

        {/* BAR */}
        <div
          className="
            mt-3
            h-4
            overflow-hidden
            rounded-full
            bg-white/20
          "
        >

          <div
            style={{
              width:
                `${progress}%`,
            }}
            className="
              h-full
              rounded-full
              bg-white
              transition-all
              duration-500
            "
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
              text-blue-100
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

    </div>

  );

}