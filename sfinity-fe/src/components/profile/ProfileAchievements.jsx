// src/components/profile/ProfileAchievements.jsx

"use client";

import { useState }
from "react";

import {
  ChevronRight,
} from "lucide-react";

import {
  achievementList,
} from "@/data/achievementData";

import AchievementPreviewCard
from "@/components/achievement/AchievementPreviewCard";

import AchievementCollectionModal
from "@/components/achievement/AchievementCollectionModal";

import { useAuthStore } from "@/stores/useAuthStore";

import {
  useUserStore,
} from "@/stores/useUserStore";

export default function ProfileAchievements() {

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
  UNLOCKED LIST
  ━━━━━━━━━━━━━━━━━━━
  */
  const unlockedAchievements =
    achievementList.filter(
      (item) =>

        unlocked.includes(
          item.id
        )
    );

  /*
  ━━━━━━━━━━━━━━━━━━━
  PREVIEW
  ━━━━━━━━━━━━━━━━━━━
  */
  const previewAchievements =
    unlockedAchievements.slice(0, 6);

  /*
  ━━━━━━━━━━━━━━━━━━━
  REMAINING
  ━━━━━━━━━━━━━━━━━━━
  */
  const remainingCount =
    unlockedAchievements.length - 6;

  return (

    <>

      <div
        className="
          rounded-[32px]
          border
          border-slate-200
          bg-white
          p-6
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

          <div>

            <h2
              className="
                text-3xl
                font-black
                text-slate-900
              "
            >
              Achievements
            </h2>

            <p
              className="
                mt-2
                text-slate-500
              "
            >
              Koleksi achievement akun kamu
            </p>

          </div>

          {/* COUNT */}
          <div
            className="
              rounded-2xl
              bg-blue-50
              px-4
              py-2
              text-sm
              font-bold
              text-blue-600
            "
          >

            {
              unlockedAchievements.length
            }
            /
            {
              achievementList.length
            }

          </div>

        </div>

        {/* SECTION */}
        <div
          className="
            mt-3
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
                Recent Achievements
              </h3>

              <p
                className="
                  mt-1
                  text-sm
                  text-slate-500
                "
              >
                Achievement terbaru yang berhasil kamu unlock
              </p>

            </div>

            {/* BUTTON */}
            <button

              onClick={
                () =>
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

          {/* PREVIEW */}
          <div
            className="
              mt-6
              flex
              items-center
              gap-5
              overflow-x-auto
              pb-1
            "
          >

            {
              previewAchievements.map(
                (achievement) => (

                  <AchievementPreviewCard
                    key={
                      achievement.id
                    }
                    achievement={
                      achievement
                    }
                  />

                )
              )
            }

            {/* MORE */}
            {
              remainingCount > 0 && (

                <button

                  onClick={
                    () =>
                      setOpen(true)
                  }

                  className="
                    flex
                    min-h-[72px]
                    min-w-[72px]
                    flex-shrink-0
                    items-center
                    justify-center
                    rounded-2xl
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

              )
            }

          </div>

          {/* MOBILE BUTTON */}
          <button

            onClick={
              () =>
                setOpen(true)
            }

            className="
              mt-6
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

            View All Achievements

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
      <AchievementCollectionModal

        open={open}

        onClose={
          () =>
            setOpen(false)
        }

      />

    </>

  );

}