"use client";

import {
  useEffect,
} from "react";

import Link
from "next/link";

import {
  useGoalStore,
} from "@/stores/useGoalStore";

import {
  formatRupiah,
} from "@/lib/formatRupiah";

export default function
GoalWidget() {

  /*
  ━━━━━━━━━━━━━━━━━━━
  STORE
  ━━━━━━━━━━━━━━━━━━━
  */
  const {

    goals,

    loading,

    fetchGoals,

  } =
    useGoalStore();

  /*
  ━━━━━━━━━━━━━━━━━━━
  FETCH
  ━━━━━━━━━━━━━━━━━━━
  */
  useEffect(() => {

    fetchGoals();

  }, [fetchGoals]);

  /*
  ━━━━━━━━━━━━━━━━━━━
  DEBUG
  ━━━━━━━━━━━━━━━━━━━
  */
  /*
  ━━━━━━━━━━━━━━━━━━━
  ACTIVE GOAL
  ━━━━━━━━━━━━━━━━━━━
  */
  const goal =
    goals.find(
      (item) =>
        !item.completed
    );

  /*
  ━━━━━━━━━━━━━━━━━━━
  LOADING
  ━━━━━━━━━━━━━━━━━━━
  */
  if (loading) {

    return (

      <div
        className="
          rounded-[32px]
          border
          border-slate-200
          bg-white
          p-6
        "
      >

        <h2
          className="
            text-xl
            font-black
          "
        >
          🎯 Goal Aktif
        </h2>

        <p
          className="
            mt-4
            text-slate-500
          "
        >
          Loading...
        </p>

      </div>

    );

  }

  /*
  ━━━━━━━━━━━━━━━━━━━
  EMPTY
  ━━━━━━━━━━━━━━━━━━━
  */
  if (!goal) {

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

        <h2
          className="
            text-xl
            font-black
          "
        >
          🎯 Goal Aktif
        </h2>

        <p
          className="
            mt-4
            text-slate-500
          "
        >
          Belum ada goal
        </p>

        <Link
          href="/goals"
          className="
            mt-4
            inline-block
            text-sm
            font-semibold
            text-emerald-600
          "
        >
          Buat Goal →
        </Link>

      </div>

    );

  }

  /*
  ━━━━━━━━━━━━━━━━━━━
  UI
  ━━━━━━━━━━━━━━━━━━━
  */
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

      {/* TITLE */}
      <h2
        className="
          text-xl
          font-black
          text-slate-900
        "
      >
        🎯 Goal Aktif
      </h2>

      {/* GOAL NAME */}
      <h3
        className="
          mt-4
          text-lg
          font-bold
          text-slate-800
        "
      >
        {goal.title}
      </h3>

      {/* PROGRESS BAR */}
      <div
        className="
          mt-4
          h-3
          overflow-hidden
          rounded-full
          bg-slate-200
        "
      >

        <div

          style={{
            width:
              `${goal.progress || 0}%`,
          }}

          className="
            h-full
            rounded-full
            bg-emerald-500
          "

        />

      </div>

      {/* AMOUNT */}
      <p
        className="
          mt-3
          font-semibold
          text-slate-700
        "
      >

        {
          formatRupiah(
            goal.currentAmount || 0
          )
        }

        {" / "}

        {
          formatRupiah(
            goal.targetAmount || 0
          )
        }

      </p>

      {/* PERCENT */}
      <p
        className="
          mt-1
          text-sm
          text-slate-500
        "
      >
        {goal.progress || 0}%
        tercapai
      </p>

      {/* LINK */}
      <Link
        href="/goals"
        className="
          mt-4
          inline-block
          text-sm
          font-semibold
          text-emerald-600
        "
      >

        Lihat Semua →

      </Link>

    </div>

  );

}
