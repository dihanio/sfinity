// src/components/achievement/AchievementCard.jsx

"use client";

import {
  getAchievementProgress,
} from "@/lib/getAchievementProgress";

export default function AchievementCard({

  achievement,

  unlocked,

  stats,

}) {

  /*
  ━━━━━━━━━━━━━━━━━━━
  SAFETY
  ━━━━━━━━━━━━━━━━━━━
  */
  if (!achievement) {
    return null;
  }

  /*
  ━━━━━━━━━━━━━━━━━━━
  PROGRESS
  ━━━━━━━━━━━━━━━━━━━
  */
  const progressData =
    getAchievementProgress(
      achievement,
      stats
    );

  /*
  SAFETY
  */
  if (!progressData) {
    return null;
  }

  return (

    <div
      className={`

        rounded-[28px]
        border
        bg-white
        p-6
        transition-all
        duration-300

        ${
          unlocked

            ? `
              border-slate-300
            `

            : `
              border-slate-200
            `
        }

      `}
    >

      {/* BADGE */}
      <div
        className="
          flex
          items-center
          justify-center
        "
      >

        <img

          src={
            achievement.image
          }

          alt={
            achievement.title
          }

          className={`
            h-24
            w-24
            object-contain
            transition-all

            ${
              unlocked

                ? `
                  opacity-100
                `

                : `
                  grayscale
                  opacity-50
                `
            }
          `}
        />

      </div>

      {/* CONTENT */}
      <div className="mt-5">

        <h3
          className="
            text-lg
            font-black
            text-slate-900
          "
        >

          {
            achievement.title
          }

        </h3>

        <p
          className="
            mt-2
            text-sm
            leading-relaxed
            text-slate-500
          "
        >

          {
            achievement.description
          }

        </p>

      </div>

      {/* PROGRESS */}
      <div className="mt-6">

        <div
          className="
            flex
            items-center
            justify-between
            text-sm
            font-semibold
            text-slate-500
          "
        >

          <span>

            {
              progressData.current
            }
            /
            {
              progressData.target
            }

          </span>

          <span>

            {
              progressData.completed

                ? "Unlocked 🏆"

                : `${Math.floor(
                    progressData.progress
                  )}%`
            }

          </span>

        </div>

        {/* BAR */}
        <div
          className="
            mt-3
            h-2
            overflow-hidden
            rounded-full
            bg-slate-100
          "
        >

          <div

            style={{

              width:
                `${progressData.progress}%`,

            }}

            className={`
              h-full
              rounded-full
              transition-all
              duration-500

              ${
                unlocked

                  ? `
                    bg-slate-900
                  `

                  : `
                    bg-slate-400
                  `
              }
            `}
          />

        </div>

      </div>

      {/* XP */}
      <div
        className={`
          mt-6
          inline-flex
          items-center
          rounded-2xl
          px-4
          py-2
          text-sm
          font-bold

          ${
            unlocked

              ? `
                bg-slate-900
                text-blue-600
              `

              : `
                bg-slate-100
                text-slate-600
              `
          }
        `}
      >

        +{achievement.xp} XP

      </div>

    </div>

  );

}