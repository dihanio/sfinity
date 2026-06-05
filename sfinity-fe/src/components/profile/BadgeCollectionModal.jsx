"use client";

import Image
from "next/image";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

import {
  X,
  Lock,
} from "lucide-react";

import {
  levelData,
} from "@/data/levelData";

import {
  useUserStore,
} from "@/stores/useUserStore";

import {
  getLevelInfo,
} from "@/lib/getLevelInfo";

export default function BadgeCollectionModal({

  open,

  onClose,

}) {

  /*
  ━━━━━━━━━━━━━━━━━━━
  XP
  ━━━━━━━━━━━━━━━━━━━
  */
  const user =
  useUserStore(
    (state) =>
      state.user
  );

const xp =
  user?.xp || 0;

  /*
  ━━━━━━━━━━━━━━━━━━━
  LEVEL
  ━━━━━━━━━━━━━━━━━━━
  */
  const currentLevel =
    getLevelInfo(xp);

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
                scale: 0.9,
                opacity: 0,
                y: 40,
              }}

              animate={{
                scale: 1,
                opacity: 1,
                y: 0,
              }}

              exit={{
                scale: 0.9,
                opacity: 0,
              }}

              className="
                relative
                flex
                h-[90vh]
                w-full
                max-w-6xl
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
                    Badge Collection
                  </h2>

                  <p
                    className="
                      mt-1
                      text-slate-500
                    "
                  >
                    Semua badge progression kamu
                  </p>

                </div>

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
                  p-4
                "
              >

                <div
                  className="
                    grid
                    grid-cols-2
                    gap-6
                    md:grid-cols-3
                    xl:grid-cols-4
                  "
                >

                  {
                    levelData.map(
                      (badge) => {

                        const unlocked =

                          currentLevel.level >=
                          badge.level;

                        return (

                          <div
                            key={
                              badge.level
                            }
                            className={`
                              relative
                              rounded-[32px]
                              border
                              p-6
                              transition-all

                              ${
                                unlocked

                                  ? `
                                    border-slate-200
                                    bg-white
                                  `

                                  : `
                                    border-slate-100
                                    bg-slate-50
                                    opacity-60
                                  `
                              }
                            `}
                          >

                            {/* IMAGE */}
                            <div
                              className="
                                relative
                                flex
                                justify-center
                              "
                            >

                              <Image
                                src={
                                  badge.badge
                                }
                                alt={
                                  badge.title
                                }
                                width={120}
                                height={120}
                                className={`
                                  object-contain

                                  ${
                                    !unlocked &&
                                    "grayscale"
                                  }
                                `}
                              />

                              {
                                !unlocked && (

                                  <div
                                    className="
                                      absolute
                                      right-2
                                      top-2
                                      flex
                                      h-10
                                      w-10
                                      items-center
                                      justify-center
                                      rounded-full
                                      bg-white
                                      shadow-md
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

                            </div>

                            {/* TEXT */}
                            <div className="mt-3 text-center">

                              <h3
                                className="
                                  text-xl
                                  font-black
                                  text-slate-900
                                "
                              >
                                {
                                  badge.title
                                }
                              </h3>

                              <p
                                className="
                                  mt-2
                                  text-sm
                                  text-slate-500
                                "
                              >
                                {
                                  badge.description
                                }
                              </p>

                            </div>

                            {/* LEVEL */}
                            <div
                              className="
                                mt-2
                                rounded-2xl
                                bg-slate-50
                                p-4
                                text-center
                              "
                            >

                              <p
                                className="
                                  text-xs
                                  font-bold
                                  uppercase
                                  tracking-wide
                                  text-slate-400
                                "
                              >
                                Required Level
                              </p>

                              <h4
                                className="
                                  mt-1
                                  text-2xl
                                  font-black
                                  text-slate-900
                                "
                              >
                                Lv
                                {" "}
                                {
                                  badge.level
                                }
                              </h4>

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