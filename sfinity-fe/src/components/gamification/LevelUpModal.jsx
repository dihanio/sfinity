"use client";

import Image
from "next/image";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

import Confetti
from "react-confetti";

import {
  useGamificationStore,
} from "@/stores/useGamificationStore";

export default function LevelUpModal() {

  const {

    showLevelUp,

    levelUpData,

    closeLevelUp,

  } =
    useGamificationStore();

  return (

    <AnimatePresence>

      {
        showLevelUp &&
        levelUpData && (

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
                      levelUpData.badge
                    }
                    alt={
                      levelUpData.title
                    }
                    width={140}
                    height={140}
                    priority
                  />

                </motion.div>

                {/* TEXT */}
                <div className="mt-5 text-center">

                  <p
                    className="
                      text-sm
                      font-semibold
                      uppercase
                      tracking-[0.25em]
                      text-slate-400
                    "
                  >
                    Level Up
                  </p>

                  <h2
                    className="
                      mt-3
                      text-5xl
                      font-black
                      tracking-tight
                      text-slate-900
                    "
                  >
                    Lv {
                      levelUpData.level
                    }
                  </h2>

                  <p
                    className="
                      mt-3
                      text-xl
                      font-bold
                      text-slate-700
                    "
                  >
                    {
                      levelUpData.title
                    }
                  </p>

                  <p
                    className="
                      mt-2
                      text-sm
                      text-slate-500
                    "
                  >
                    Badge baru berhasil dibuka
                  </p>

                </div>

                {/* BUTTON */}
                <button

                  onClick={
                    closeLevelUp
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