"use client";

import {
  useGoalStore,
} from "@/stores/useGoalStore";

import GoalCard
from "./GoalCard";

export default function
GoalList() {

  const goals =
    useGoalStore(
      (state) =>
        state.goals
    );

  if (
    goals.length === 0
  ) {

    return (

      <div
        className="
          rounded-[28px]
          border
          bg-white
          p-8
          text-center
        "
      >

        Belum ada goal.

      </div>

    );

  }

  return (

    <div
      className="
        grid
        gap-5
        md:grid-cols-2
      "
    >

      {goals.map(
        (goal) => (

          <GoalCard

            key={
              goal._id
            }

            goal={
              goal
            }

          />

        )
      )}

    </div>

  );

}