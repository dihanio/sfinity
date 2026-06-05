"use client";

import {
  useEffect,
} from "react";

import Link
from "next/link";

import {

  ChevronRight,

  Activity,

} from "lucide-react";

import {
  useActivityFeedStore,
} from "@/stores/useActivityFeedStore";

import ActivityCard
from "@/components/activity/ActivityCard";

export default function ProfileActivity() {

  /*
  ━━━━━━━━━━━━━━━━━━━
  STORE
  ━━━━━━━━━━━━━━━━━━━
  */
  const {

    activities,

    fetchActivities,

    loading,

  } =
    useActivityFeedStore();

  /*
  ━━━━━━━━━━━━━━━━━━━
  FETCH
  ━━━━━━━━━━━━━━━━━━━
  */
  useEffect(() => {

    fetchActivities();

  }, []);

  /*
  ━━━━━━━━━━━━━━━━━━━
  LIMIT
  ━━━━━━━━━━━━━━━━━━━
  */
  const latestActivities =

    activities?.slice(0, 3) || [];

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
            Recent Activity
          </h2>

          <p
            className="
              mt-1
              text-slate-500
            "
          >
            Aktivitas realtime akun kamu
          </p>

        </div>

      </div>

      {/* LOADING */}
      {
        loading && (

          <div className="mt-8 space-y-4">

            {
              Array.from({
                length: 3,
              }).map((_, i) => (

                <div
                  key={i}
                  className="
                    h-24
                    animate-pulse
                    rounded-3xl
                    bg-slate-100
                  "
                />

              ))
            }

          </div>

        )
      }

      {/* EMPTY */}
      {
        !loading &&
        latestActivities.length === 0 && (

          <div
            className="
              mt-8
              rounded-3xl
              border
              border-dashed
              border-slate-200
              bg-slate-50
              p-10
              text-center
            "
          >

            <div
              className="
                mx-auto
                flex
                h-16
                w-16
                items-center
                justify-center
                rounded-full
                bg-white
              "
            >

              <Activity
                className="
                  h-8
                  w-8
                  text-slate-400
                "
              />

            </div>

            <h3
              className="
                mt-5
                text-lg
                font-bold
                text-slate-900
              "
            >
              Belum Ada Aktivitas
            </h3>

          </div>

        )
      }

      {/* LIST */}
      {
        !loading &&
        latestActivities.length > 0 && (

          <div className="mt-8 space-y-4">

            {
              latestActivities.map(
                (item) => (

                  <ActivityCard

                    key={
                      item._id
                    }

                    item={item}

                  />

                )
              )
            }

          </div>

        )
      }

      {/* BUTTON */}
      <Link
        href="/activity"
        className="
          mt-6
          flex
          items-center
          justify-center
          gap-2
          rounded-2xl
          border
          border-slate-200
          bg-slate-50
          p-4
          font-semibold
          text-slate-700
          transition-all
          hover:bg-slate-100
        "
      >

        View All Activity

        <ChevronRight
          className="
            h-5
            w-5
          "
        />

      </Link>

    </div>

  );

}