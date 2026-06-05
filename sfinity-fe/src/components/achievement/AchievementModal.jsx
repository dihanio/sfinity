"use client";

import Image from "next/image";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

import Confetti from "react-confetti";

import {
  Sparkles,
  Trophy,
} from "lucide-react";

import {
  useAchievementStore,
} from "@/stores/useAchievementStore";



export default function AchievementModal() {

  const {

    showAchievement,

    achievementData,

    closeAchievement,

  } =
    useAchievementStore();

  return (

    <AnimatePresence>

      {
        showAchievement &&
        achievementData && (

          <>

            <Confetti
              recycle={false}
              numberOfPieces={120}
            />

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
                bg-black/50
                p-5
                backdrop-blur-sm
              "
            >

              <motion.div

                initial={{
                  scale: 0.9,
                  opacity: 0,
                  y: 20,
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

                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 18,
                }}

                className="
                  relative
                  w-full
                  max-w-md
                  rounded-[36px]
                  bg-white
                  p-8
                  shadow-2xl
                "
              >

                {/* BADGE */}
                <motion.div

                  animate={{
                    y: [
                      0,
                      -4,
                      0,
                    ],
                  }}

                  transition={{
                    duration: 2,
                    repeat:
                      Infinity,
                  }}

                  className="
                    mx-auto
                    flex
                    h-36
                    w-36
                    items-center
                    justify-center
                  "
                >

                  <Image
                    src={
                      achievementData?.image ||
                      "/placeholder.png"
                    }
                    alt={
                      achievementData?.title ||
                      "Achievement"
                    }
                    width={140}
                    height={140}
                    priority
                  />

                </motion.div>

                {/* TEXT */}
                <div className="mt-5 text-center">

                  <div
                    className="
                      inline-flex
                      items-center
                      gap-2
                      rounded-full
                      bg-blue-100
                      px-4
                      py-2
                      text-sm
                      font-bold
                      text-slate-700
                    "
                  >

                    <Sparkles
                      className="
                        h-4
                        w-4
                      "
                    />

                    Unlocked 🏆

                  </div>

                  <h2
                    className="
                      mt-5
                      text-4xl
                      font-black
                      tracking-tight
                      text-slate-900
                    "
                  >

                    {
                      achievementData?.title
                    }

                  </h2>

                  <p
                    className="
                      mt-3
                      text-sm
                      leading-relaxed
                      text-slate-500
                    "
                  >

                    {
                      achievementData?.description
                    }

                  </p>

                </div>

                {/* XP CARD */}
                <div
                  className="
                    mt-4
                    text-emerald
                  "
                >

                  <div
                    className="
                      flex
                      items-center
                      justify-center
                      gap-3
                    "
                  >
                    <span
                      className="
                        text-3xl
                        font-emerald
                      "
                    >

                      +
                      {
                        achievementData?.xp
                      }
                      XP

                    </span>

                  </div>

                </div>

                {/* BUTTON */}
                <button

                  onClick={
                    closeAchievement
                  }

                  className="
                    mt-8
                    h-14
                    w-full
                    rounded-2xl
                    bg-emerald-500
                    font-semibold
                    text-blue-600
                    transition-all
                    hover:bg-emerald-700
                  "
                >

                  Lanjutkan

                </button>

              </motion.div>

            </motion.div>

          </>

        )
      }

    </AnimatePresence>

  );

}