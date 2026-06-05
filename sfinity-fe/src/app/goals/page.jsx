"use client";

import {
  useEffect,
} from "react";

import DashboardLayout
from "@/components/layout/DashboardLayout";

import GoalHeader
from "@/components/goal/GoalHeader";

import GoalList
from "@/components/goal/GoalList";

import {
  useGoalStore,
} from "@/stores/useGoalStore";

export default function
GoalPage() {

  const fetchGoals =
    useGoalStore(
      (state) =>
        state.fetchGoals
    );

  useEffect(() => {

    fetchGoals();

  }, [fetchGoals]);

  return (

    <DashboardLayout>

      <div
        className="
          space-y-6
        "
      >

        <GoalHeader />

        <GoalList />

      </div>

    </DashboardLayout>

  );

}