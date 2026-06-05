"use client";

import Link
from "next/link";


import {

  Clock3,

  ChevronRight,

} from "lucide-react";

import {
  useActivityFeedStore,
} from "@/stores/useActivityFeedStore";

import ActivityCard
from "@/components/activity/ActivityCard";

export default function ProfileActivity() {

  /*
  ━━━━━━━━━━━━━━━━━━━
  ACTIVITIES
  ━━━━━━━━━━━━━━━━━━━
  */
  const activities =
    useActivityFeedStore(
      (state) =>
        state.activities || []
    )

      .slice(0, 5);

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

      {/* EMPTY */}
      {
        activities.length === 0 && (

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

            <h3
              className="
                text-lg
                font-bold
                text-slate-900
              "
            >
              Belum Ada Aktivitas
            </h3>

            <p
              className="
                mt-2
                text-sm
                text-slate-500
              "
            >
              Aktivitas akan muncul di sini.
            </p>

          </div>

        )
      }

      {/* LIST */}
      <div className="mt-8 space-y-4">

        {
          activities.map(
            (item) => (

              <ActivityCard
                key={item.id}
                item={item}
              />

            )
          )
        }

      </div>

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