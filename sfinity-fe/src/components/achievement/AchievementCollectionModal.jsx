// src/components/achievement/AchievementCollectionModal.jsx

"use client";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

import {
  X,
  Lock,
} from "lucide-react";

import {
  achievementList,
} from "@/data/achievementData";

import {
  getAchievementProgress,
} from "@/lib/getAchievementProgress";

import {
  useAuthStore,
} from "@/stores/useAuthStore";

import {
  useUserStore,
} from "@/stores/useUserStore";

export default function AchievementCollectionModal({

  open,

  onClose,

}) {

  /*
  ━━━━━━━━━━━━━━━━━━━
  STORE
  ━━━━━━━━━━━━━━━━━━━
  */

const user =
  useUserStore(
    (state) =>
      state.user
  );

const unlocked =
  user?.achievements || [];

const stats =
  user?.stats || {};

  return (

    <AnimatePresence>

      {
        open && (

          <motion.div

            initial={{
              opacity: 0,
            }}

            animate={{
              opacity: 1,
            }}

            exit={{
              opacity: 0,
            }}

            className="
              fixed
              inset-0
              z-[999]
              flex
              items-center
              justify-center
              bg-black/40
              p-4
              backdrop-blur-sm
            "
          >

            <motion.div

              initial={{
                scale: 0.95,
                opacity: 0,
                y: 30,
              }}

              animate={{
                scale: 1,
                opacity: 1,
                y: 0,
              }}

              exit={{
                scale: 0.95,
                opacity: 0,
              }}

              className="
                relative
                flex
                h-[90vh]
                w-full
                max-w-7xl
                flex-col
                overflow-hidden
                rounded-[36px]
                bg-white
                shadow-2xl
              "
            >

              {/* HEADER */}
              <div
                className="
                  flex
                  items-center
                  justify-between
                  border-b
                  border-slate-200
                  p-6
                "
              >

                <div>

                  <h2
                    className="
                      text-3xl
                      font-black
                      text-slate-900
                    "
                  >
                    Achievement Collection
                  </h2>

                  <p
                    className="
                      mt-2
                      text-slate-500
                    "
                  >
                    Semua achievement progression akun kamu
                  </p>

                </div>

                {/* CLOSE */}
                <button

                  onClick={
                    onClose
                  }

                  className="
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center
                    rounded-2xl
                    bg-slate-100
                    transition-all
                    hover:bg-slate-200
                  "
                >

                  <X
                    className="
                      h-5
                      w-5
                    "
                  />

                </button>

              </div>

              {/* CONTENT */}
              <div
                className="
                  flex-1
                  overflow-y-auto
                  p-6
                "
              >

                {/* GRID */}
                <div
                  className="
                    grid
                    grid-cols-2
                    gap-5
                    md:grid-cols-3
                    lg:grid-cols-4
                  "
                >

                  {
                    achievementList.map(
                      (
                        achievement
                      ) => {

                        const isUnlocked =

                          unlocked.includes(
                            achievement.id
                          );

                        const progress =
                          getAchievementProgress(

                            achievement,

                            stats

                          );

                        return (

                          <div

                            key={
                              achievement.id
                            }

                            className={`
                              group
                              relative
                              overflow-hidden
                              rounded-[32px]
                              border
                              p-5
                              transition-all
                              hover:-translate-y-1
                              hover:shadow-lg

                              ${
                                isUnlocked

                                  ? `
                                    border-blue-100
                                    bg-white
                                  `

                                  : `
                                    border-slate-200
                                    bg-slate-50
                                  `
                              }
                            `}
                          >

                            {/* LOCK */}
                            {
                              !isUnlocked && (

                                <div
                                  className="
                                    absolute
                                    right-4
                                    top-4
                                    flex
                                    h-10
                                    w-10
                                    items-center
                                    justify-center
                                    bg-white
                                    shadow-sm
                                  "
                                >

                                  <Lock
                                    className="
                                      h-5
                                      w-5
                                      text-slate-500
                                    "
                                  />

                                </div>

                              )
                            }

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
                                    isUnlocked

                                      ? `
                                        opacity-100
                                      `

                                      : `
                                        grayscale
                                        opacity-40
                                      `
                                  }
                                `}
                              />

                            </div>

                            {/* TEXT */}
                            <div className="mt-2">

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
                                    progress.current
                                  }
                                  /
                                  {
                                    progress.target
                                  }

                                </span>

                                <span>

                                  {
                                    Math.floor(
                                      progress.progress
                                    )
                                  }
                                  %

                                </span>

                              </div>

                              {/* BAR */}
                              <div
                                className="
                                  mt-2
                                  h-3
                                  overflow-hidden
                                  rounded-full
                                  bg-slate-200
                                "
                              >

                                <div

                                  style={{

                                    width:
                                      `${progress.progress}%`,

                                  }}

                                  className="
                                    h-full
                                    rounded-full
                                    bg-blue-500
                                    transition-all
                                  "
                                />

                              </div>

                            </div>

                            {/* XP */}
                            <div
                              className="
                                mt-2
                                inline-flex
                                rounded-2xl
                                bg-blue-50
                                px-4
                                py-2
                                text-sm
                                font-bold
                                text-blue-600
                              "
                            >

                              +
                              {
                                achievement.xp
                              }
                              XP

                            </div>

                          </div>

                        );

                      }
                    )
                  }

                </div>

              </div>

            </motion.div>

          </motion.div>

        )
      }

    </AnimatePresence>

  );

}