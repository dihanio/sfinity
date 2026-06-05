"use client";

import {
  CheckCircle2,
  Clock3,
  Circle,
  Flame,
  BookOpen,
  PlayCircle,
} from "lucide-react";

import {
  useUserStore,
} from "@/stores/useUserStore";

import {
  useRecommendationStore,
} from "@/stores/useRecommendationStore";

import {
  useMissionStore,
} from "@/stores/useMissionStore";


export default function DailyMission() {
  /*
    ACTIVITY
  */
 const user =
  useUserStore(
    (state) =>
      state.user
  );

const stats =
  user?.stats || {};

  /*
    CHALLENGE
  */
  const {
    activeChallenges,

    completedChallenges,
  } =
    useRecommendationStore();

/*
MISSIONS
*/
const missions =
  useMissionStore(
    (state) =>
      state.dailyMissions
  );


  /*
MISSION STATUS
*/
/*
MISSION STATUS
*/
const updatedMissions =
  missions.map(
    (mission) => {

      /*
      CHECKIN
      */
      if (
        mission.type ===
        "checkin"
      ) {

        const today =
          new Date()
            .toISOString()
            .split("T")[0];

        return {

          ...mission,

          completed:
            user?.lastCheckinDate ===
            today,

        };

      }

      /*
      ARTICLE
      */
      if (
        mission.type ===
        "article"
      ) {

        return {

          ...mission,

          completed:
            (stats.articlesRead || 0) >=
            mission.requirement,

        };

      }

      /*
      VIDEO
      */
      if (
        mission.type ===
        "video"
      ) {

        return {

          ...mission,

          completed:
            (stats.videosWatched || 0) >=
            mission.requirement,

        };

      }

      /*
      SCAN
      */
      if (
        mission.type ===
        "scan"
      ) {

        return {

          ...mission,

          completed:
            (stats.scans || 0) >=
            mission.requirement,

        };

      }

      /*
      TRANSACTION
      */
      if (
        mission.type ===
        "transaction"
      ) {

        return {

          ...mission,

          completed:
            (stats.transactions || 0) >=
            mission.requirement,

        };

      }

      /*
      CHALLENGE
      */
      if (
        mission.type ===
        "challenge"
      ) {

        if (
          mission.title
            .toLowerCase()
            .includes(
              "selesaikan"
            )
        ) {

          return {

            ...mission,

            completed:
              completedChallenges.length >=
              mission.requirement,

          };

        }

        return {

          ...mission,

          completed:
            activeChallenges.length >=
            mission.requirement,

        };

      }

      return {

        ...mission,

        completed: false,

      };

    }
  );
  /*
    COMPLETED COUNT
  */
  const completedCount =
   updatedMissions.filter(
      (item) =>
        item.completed
    ).length;

  /*
    PROGRESS
  */
  const progress =
    (
      (completedCount /
        missions.length) *
      100
    ).toFixed(0);

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
              text-2xl
              font-black
              text-slate-900
            "
          >
            Daily Missions
          </h2>
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
              text-sm
              font-medium
              text-slate-500
            "
          >
            Progress Mission
          </p>

          <p
            className="
              text-sm
              font-bold
              text-slate-900
            "
          >
            {completedCount}/
            {missions.length}
          </p>
        </div>

        {/* BAR */}
        <div
          className="
            mt-3
            h-3
            overflow-hidden
            rounded-full
            bg-blue-100
          "
        >
          <div
            style={{
              width: `${progress}%`,
            }}
            className="
              h-full
              rounded-full
              bg-blue-600
              transition-all
              duration-500
            "
          />
        </div>
      </div>

      {/* LIST */}
      <div className="mt-8 space-y-4">
        {updatedMissions.map(
          (mission) => (
            <div
              key={mission.id}
              className={`
                flex
                items-center
                justify-between
                rounded-2xl
                border
                p-5
                transition-all
                ${
                  mission.completed
                    ? "border-emerald-200 bg-emerald-50"
                    : "border-slate-200 bg-white"
                }
              `}
            >
              {/* LEFT */}
              <div className="flex items-center gap-4">
                {/* ICON */}
                <div
                  className={`
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center
                    rounded-2xl
                    ${
                      mission.completed
                        ? "bg-emerald-100"
                        : "bg-slate-100"
                    }
                  `}
                >
                  {mission.type ===
                  "checkin" ? (
                    <Flame
                      className={`
                        h-6
                        w-6
                        ${
                          mission.completed
                            ? "text-emerald-600"
                            : "text-slate-500"
                        }
                      `}
                    />
                  ) : mission.type ===
                    "article" ? (
                    <BookOpen
                      className={`
                        h-6
                        w-6
                        ${
                          mission.completed
                            ? "text-emerald-600"
                            : "text-slate-500"
                        }
                      `}
                    />
                  ) : mission.type ===
                    "video" ? (
                    <PlayCircle
                      className={`
                        h-6
                        w-6
                        ${
                          mission.completed
                            ? "text-emerald-600"
                            : "text-slate-500"
                        }
                      `}
                    />
                  ) : (
                    <Flame
                      className={`
                        h-6
                        w-6
                        ${
                          mission.completed
                            ? "text-emerald-600"
                            : "text-slate-500"
                        }
                      `}
                    />
                  )}
                </div>

                {/* TEXT */}
                <div>
                  <h3
                    className="
                      font-bold
                      text-slate-900
                    "
                  >
                    {mission.title}
                  </h3>

                  <p
                    className="
                      mt-1
                      text-sm
                      text-slate-500
                    "
                  >
                    +{mission.xp} XP
                  </p>
                </div>
              </div>

              {/* STATUS */}
              {mission.completed ? (
                <div
                  className="
                    inline-flex
                    items-center
                    gap-2
                    rounded-xl
                    bg-emerald-100
                    px-4
                    py-2
                    text-sm
                    font-semibold
                    text-emerald-600
                  "
                >
                  <CheckCircle2 className="h-4 w-4" />

                  Selesai
                </div>
              ) : (
                <div
                  className="
                    inline-flex
                    items-center
                    gap-2
                    rounded-xl
                    bg-slate-100
                    px-4
                    py-2
                    text-sm
                    font-semibold
                    text-slate-500
                  "
                >
                  <Circle className="h-4 w-4" />

                  Belum
                </div>
              )}
            </div>
          )
        )}
      </div>
    </div>
  );
}