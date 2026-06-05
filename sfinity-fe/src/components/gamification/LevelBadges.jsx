"use client";

import { useState }
from "react";

import Image
from "next/image";

import {
  ChevronRight,
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

import BadgeCollectionModal
from "@/components/profile/BadgeCollectionModal";

export default function LevelBadges() {

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
  MODAL
  ━━━━━━━━━━━━━━━━━━━
  */
  const [
    open,
    setOpen,
  ] = useState(false);

  /*
  ━━━━━━━━━━━━━━━━━━━
  LEVEL INFO
  ━━━━━━━━━━━━━━━━━━━
  */
  const levelInfo =
    getLevelInfo(xp);

  /*
  ━━━━━━━━━━━━━━━━━━━
  UNLOCKED BADGES
  ━━━━━━━━━━━━━━━━━━━
  */
  const unlockedBadges =
    levelData.filter(
      (item) =>
        levelInfo.level >=
        item.level
    );

  /*
  ━━━━━━━━━━━━━━━━━━━
  PREVIEW BADGES
  ━━━━━━━━━━━━━━━━━━━
  */
  const previewBadges =
    unlockedBadges.slice(0, 6);

  /*
  ━━━━━━━━━━━━━━━━━━━
  REMAINING
  ━━━━━━━━━━━━━━━━━━━
  */
  const remainingCount =
    unlockedBadges.length - 6;

  /*
  ━━━━━━━━━━━━━━━━━━━
  NEXT BADGE
  ━━━━━━━━━━━━━━━━━━━
  */
  const nextBadge =
    levelData.find(
      (item) =>
        item.level >
        levelInfo.level
    );

  return (
    <>
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
        {/* HEADER */}
        <div
          className="
            flex
            items-start
            justify-between
            gap-4
          "
        >
          {/* LEFT */}
          <div>
            <h2
              className="
                text-3xl
                font-black
                text-slate-900
              "
            >
              Badges
            </h2>

            <p
              className="
                mt-2
                text-slate-500
              "
            >
              Badge progression
              level akun kamu
            </p>
          </div>
        </div>

        {/* BADGE SECTION */}
        <div
          className="
            mt-6
            rounded-[28px]
            border
            border-slate-200
            bg-slate-50
            p-5
          "
        >
          {/* TOP */}
          <div
            className="
              flex
              items-center
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
                Recent Badges
              </h3>

              <p
                className="
                  mt-1
                  text-sm
                  text-slate-500
                "
              >
                Badge yang berhasil
                kamu unlock
              </p>
            </div>

            {/* DESKTOP BUTTON */}
            <button
              onClick={() =>
                setOpen(true)
              }
              className="
                hidden
                items-center
                gap-2
                rounded-2xl
                border
                border-slate-200
                bg-white
                px-4
                py-3
                text-sm
                font-bold
                text-slate-700
                transition-all
                hover:border-slate-300
                hover:bg-slate-100
                md:flex
              "
            >
              View All

              <ChevronRight
                className="
                  h-4
                  w-4
                "
              />
            </button>
          </div>

          {/* BADGES */}
          <div
            className="
              mt-2
              flex
              items-center
              gap-4
              overflow-x-auto
              pb-1
            "
          >
            {previewBadges.map(
              (badge) => (
                <div
                  key={
                    badge.level
                  }
                  className="
                    group
                    flex
                    flex-shrink-0
                    flex-col
                    items-center
                  "
                >
                  {/* IMAGE */}
                  <div
                    className="
                      relative
                      transition-all
                      duration-300
                      group-hover:scale-110
                    "
                  >
                    {/* GLOW */}
                    <div
                      className="
                        absolute
                        inset-0
                        rounded-full
                        bg-blue-400/20
                        blur-2xl
                        opacity-0
                        transition-all
                        duration-300
                        group-hover:opacity-100
                      "
                    />

                    <Image
                      src={
                        badge.badge
                      }
                      alt={
                        badge.title
                      }
                      width={92}
                      height={92}
                      className="
                        relative
                        object-contain
                      "
                    />
                  </div>

                  {/* LEVEL */}
                  <p
                    className="
                      mt-1
                      text-xs
                      font-bold
                      text-slate-500
                    "
                  >
                    Lv {badge.level}
                  </p>
                </div>
              )
            )}

            {/* MORE */}
            {remainingCount >
              0 && (
              <button
                onClick={() =>
                  setOpen(true)
                }
                className="
                  flex
                  h-[72px]
                  min-w-[72px]
                  flex-shrink-0
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-dashed
                  border-slate-300
                  bg-white
                  text-sm
                  font-black
                  text-slate-700
                  transition-all
                  hover:border-slate-400
                  hover:bg-slate-100
                "
              >
                +
                {
                  remainingCount
                }
              </button>
            )}
          </div>

          {/* MOBILE BUTTON */}
          <button
            onClick={() =>
              setOpen(true)
            }
            className="
              mt-3
              flex
              items-center
              justify-center
              gap-2
              rounded-2xl
              border
              border-slate-200
              bg-white
              px-4
              py-4
              text-sm
              font-bold
              text-slate-700
              transition-all
              hover:bg-slate-100
              md:hidden
            "
          >
            View All Badges

            <ChevronRight
              className="
                h-4
                w-4
              "
            />
          </button>
        </div>
      </div>

      {/* MODAL */}
      <BadgeCollectionModal
        open={open}
        onClose={() =>
          setOpen(false)
        }
      />
    </>
  );
}