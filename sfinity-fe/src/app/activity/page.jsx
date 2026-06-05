"use client";

import DashboardLayout
from "@/components/layout/DashboardLayout";

import Link from "next/link";

import {
  useState,
} from "react";

import {
  ArrowLeft,
  Clock3,
} from "lucide-react";

import {
  useActivityFeedStore,
} from "@/stores/useActivityFeedStore";

import ActivityCard
from "@/components/activity/ActivityCard";

export default function ActivityPage() {

  const [currentPage, setCurrentPage] =
  useState(1);

const itemsPerPage = 10;

  /*
  ━━━━━━━━━━━━━━━━━━━
  ACTIVITIES
  ━━━━━━━━━━━━━━━━━━━
  */
  const activities =
    useActivityFeedStore(
      (state) =>
        state.activities || []
    );

    const sortedActivities =
  [...activities].sort(
    (a, b) =>
      new Date(b.createdAt) -
      new Date(a.createdAt)
  );

  const totalPages =
  Math.ceil(
    sortedActivities.length /
    itemsPerPage
  );

const startIndex =
  (currentPage - 1) *
  itemsPerPage;

const paginatedActivities =
  sortedActivities.slice(
    startIndex,
    startIndex +
      itemsPerPage
  );

  

  return (

    <DashboardLayout>

      <div className="space-y-8">

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
          <div
            className="
              flex
              items-start
              gap-4
            "
          >

            {/* BACK BUTTON */}
            <Link
              href="/dashboard"
              className="
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-3xl
                border
                border-slate-200
                bg-white
                text-slate-700
                shadow-sm
                transition-all
                hover:bg-slate-100
              "
            >

              <ArrowLeft
                className="
                  h-6
                  w-6
                "
              />

            </Link>

            {/* TITLE */}
            <div>

              <h1
                className="
                  text-4xl
                  font-black
                  text-slate-900
                "
              >
                Activity Timeline
              </h1>

              <p
                className="
                  mt-2
                  text-slate-500
                "
              >
                Semua aktivitas akun kamu
              </p>

            </div>

          </div>

        </div>

        {/* EMPTY */}
        {
          activities.length === 0 && (

            <div
              className="
                rounded-[32px]
                border
                border-dashed
                border-slate-200
                bg-white
                p-16
                text-center
              "
            >

              <h2
                className="
                  text-2xl
                  font-black
                  text-slate-900
                "
              >
                Belum Ada Aktivitas
              </h2>

              <p
                className="
                  mt-3
                  text-slate-500
                "
              >
                Aktivitas scan,
                transaksi,
                budget,
                XP,
                level,
                dan achievement
                akan muncul di sini.
              </p>

            </div>

          )
        }

        {/* LIST */}
        <div className="space-y-4">

          {
            paginatedActivities.map(
  (item) => (
    <ActivityCard
      key={item._id}
      item={item}
    />
  )
)
          }

        </div>
        {
  totalPages > 1 && (

    <div
      className="
        flex
        items-center
        justify-center
        gap-2
        pt-6
      "
    >

      <button
        disabled={
          currentPage === 1
        }
        onClick={() =>
          setCurrentPage(
            (prev) =>
              prev - 1
          )
        }
        className="
          rounded-2xl
          border
          border-slate-200
          px-4
          py-2
          text-sm
          font-semibold
          disabled:opacity-50
        "
      >
        Prev
      </button>

      {
        Array.from({
          length:
            totalPages,
        }).map(
          (_, index) => (

            <button
              key={index}
              onClick={() =>
                setCurrentPage(
                  index + 1
                )
              }
              className={`
                h-10
                w-10
                rounded-xl
                text-sm
                font-bold
                transition-all

                ${
                  currentPage ===
                  index + 1

                    ? "bg-violet-600 text-white"

                    : "border border-slate-200 bg-white"
                }
              `}
            >
              {index + 1}
            </button>

          )
        )
      }

      <button
        disabled={
          currentPage ===
          totalPages
        }
        onClick={() =>
          setCurrentPage(
            (prev) =>
              prev + 1
          )
        }
        className="
          rounded-2xl
          border
          border-slate-200
          px-4
          py-2
          text-sm
          font-semibold
          disabled:opacity-50
        "
      >
        Next
      </button>

    </div>

  )
}

      </div>

    </DashboardLayout>

  );

}